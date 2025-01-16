# import os
# from authlib.integrations.starlette_client import OAuth
# from fastapi import APIRouter, Request, HTTPException
# from psycopg2 import Error
# from shared.db import conn
# from starlette.middleware.sessions import SessionMiddleware
# from .route import user
#
# # Initialize OAuth
# oauth = OAuth()
#
# # Register Google as an OAuth provider
#
# oauth.register(
#     name="google",
#     client_id="717697402306-s4870o88h6n47e1tj3l26hae6151k0fm.apps.googleusercontent.com",
#     client_secret="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",
#     authorize_url='http://localhost:8004',
#     server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
#     client_kwargs={"scope": "openid email profile",
#                    'redirect_uri': 'http://localhost:8004/auth/google/callback'},
# )
#
#
# # Initiate Google Login
# @user.get("/login/google", tags=["Google Login"])
# async def google_login(request: Request):
#     try:
#         redirect_uri = request.url_for("google_auth_callback")
#         return await oauth.google.authorize_redirect(request, redirect_uri)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error during Google login: {str(e)}")
#
#
# # Handle Google Login Callback
# @user.get("/auth/google/callback", tags=["Google Login"])
# async def google_auth_callback(request: Request):
#     try:
#         # Retrieve token from Google
#         token = await oauth.google.authorize_access_token(request)
#
#         # Parse user info from the token
#         user_info = token.get("userinfo") or await oauth.google.parse_id_token(request, token)
#
#         if not user_info:
#             return {"error": "Authentication failed", "success": False}
#
#         email = user_info.get("email")
#
#         # Interact with the database
#         cur = conn.cursor()
#
#         # Check if the user exists
#         cur.execute("SELECT * FROM register WHERE email = %s", (email,))
#         existing_user = cur.fetchone()
#
#         if existing_user:
#             cur.close()
#             return {"message": "User already exists. Login successful.", "success": True}
#
#         # Register new user
#         cur.execute(
#             "INSERT INTO register (email, fullName, gender) VALUES (%s, %s, %s)",
#             (email, user_info.get("name"), user_info.get("gender", "other")),
#         )
#         conn.commit()
#         cur.close()
#
#         return {"message": "User registered successfully via Google Login.", "success": True}
#
#     except Error as db_error:
#         raise HTTPException(status_code=500, detail=f"Database error: {db_error}")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error during authentication: {str(e)}")
