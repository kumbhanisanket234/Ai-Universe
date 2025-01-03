"""
Main module of exchange backend.
"""
import os
import pathlib
import logging
import uvicorn
from app.user.route import user
from customized_log import CustomizeLogger
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request, HTTPException, Security


"""
code for save logs in customise path
"""
logger = logging.getLogger(__name__)
module_path = str(pathlib.Path(__file__).parent.absolute())
config_path = str(os.path.join(module_path, "..", "config", "logging_config.json"))


def create_app() -> FastAPI:
    app = FastAPI(title='Ai Universe', debug=False)
    logger = CustomizeLogger.make_logger(config_path)
    app.logger = logger
    app.include_router(user)
    return app


app = create_app()

origins = [
    "*"
    # "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, port=8000, ws_ping_interval=1, ws_ping_timeout=-1)
