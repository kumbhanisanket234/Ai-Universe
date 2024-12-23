import React from 'react'

const Footer = () => {
  return (
    <footer className='section_detail presale_section footer_section'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 mb-lg-0 mb-4'>
            <a href='/'>
              <img src='/images/logo.svg' alt='Ai-Universe Logo' />
            </a>
            <p className='color_white_opacity_70 mt-3 mb-4'>
              The Ai-Universe is AI Device Registration Platform stands out as a unique
              ecosystem, designed exclusively to register and manage AI devices.
            </p>
            <div className='d-flex align-items-center gap-3'>
              <a href='#' target='_blank'>
                <img src='/images/Instagram.svg' alt='Instagram' />
              </a>
              <a href='#' target='_blank'>
                <img src='/images/Facebook.svg' alt='Facebook' />
              </a>
              <a href='#' target='_blank'>
                <img src='/images/telegram.svg' alt='Telegram' />
              </a>
            </div>
          </div>
          <div className='col-lg-2 col-md-4 col-6 offset-lg-1'>
            <p className='footer_p'>Introduction</p>
            <ul>
              <li>
                <a href='#'>About Us</a>
              </li>
              <li>
                <a href='#' target='_blank'>
                  Ecosystem
                </a>
              </li>
              <li>
                <a href='#'>Mission 369</a>
              </li>
              <li>
                <a href='#'>Purpose</a>
              </li>
              <li>
                <a href='#'>Consensus</a>
              </li>
              <li>
                <a href='#' target='_blank'>
                  Tokenomics
                </a>
              </li>
              <li>
                <a href='#' target='_blank'>
                  Roadmap
                </a>
              </li>
            </ul>
          </div>
          <div className='col-lg-2 col-md-4 col-6'>
            <p className='footer_p'>Tools</p>
            <ul>
              <li>
                <a href='#' target='_blank'>
                  Wallet
                </a>
              </li>
              <li>
                <a href='#' target='_blank'>
                  Explorer
                </a>
              </li>
              <li>
                <a href='#'>Bridges</a>
              </li>
              <li>
                <a href='#'>Documentation</a>
              </li>
              <li>
                <a href='#'>Mainnet</a>
              </li>
              <li>
                <a href='#'>Faucets</a>
              </li>
              <li>
                <a href='#'>Launch NFTs</a>
              </li>
            </ul>
          </div>
          <div className='col-lg-3 col-md-4 mt-md-0 mt-3'>
            <p className='footer_p'>Documentation</p>
            <ul>
              <li>
                <a href='#' target='_blank'>
                  Whitepaper
                </a>
              </li>
              <li>
                <a href='#'>Brand Kit</a>
              </li>
              <li>
                <a href='#'>News &amp; Updates</a>
              </li>
              <li>
                <a href='#'>Developer Documentation</a>
              </li>
              <li>
                <a href='#'>Dev Forum</a>
              </li>
            </ul>
          </div>
        </div>
        <div className='footer_border' />
        <div className='d-lg-flex align-items-center justify-content-between'>
          <p className='color_white_opacity_70'>
            @2024 registered Ai-Universe.
          </p>
          <p className='color_white_opacity_70 mt-lg-0 mt-2'>
            Ready to join Ai-Universe now!
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
