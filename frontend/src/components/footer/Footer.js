// components/Footer.js
import './footer.css';  
import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon
} from 'mdb-react-ui-kit';
export default function Footer() {
  return (
    <div className="main">
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted '>
      <section className='d-flex justify-content-center justify-content-lg-between p-1 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <h3 style={{ color: 'green ' }}>Ran Kahata</h3>
        </div>

        <div>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
               Ran Kahata
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' style={{ color: 'green ' }}>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!' style={{ color: 'green ' }}>
                  React
                </a>
              </p>
              <p>
                <a href='#!' style={{ color: 'green ' }}>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' style={{ color: 'green ' }}>
                  Laravel
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
              <p style={{ color: 'green ' }}>
                         Pricing
                 </p>


              </p>
              <p>
                <a href='#!'style={{ color: 'green ' }}>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!'style={{ color: 'green ' }}>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!'style={{ color: 'green ' }}>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                info@example.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div >
       
    
      </div>
    
    </MDBFooter>
    </div>
  );
}
