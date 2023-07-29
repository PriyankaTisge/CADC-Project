import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter className="bg-light text-center text-dark">
      <MDBContainer className='p-2 pb-0'>
        <section className='mb-1'>
          <MDBBtn
            floating
            className='m-1 rounded-circle'
            style={{ backgroundColor: '#dd4b39',padding:'15px'}}
            href='#!'
            role='button'
          >
            <MDBIcon  fab icon='facebook-f' />
            
          </MDBBtn>
          <MDBBtn
            floating
            className='m-1 rounded-circle'
            style={{ backgroundColor: '#dd4b39',padding:'15px' }}
            href='#!'
          >
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn
            floating
            className='m-1 rounded-circle'
            style={{ backgroundColor: '#333333',padding:'15px' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3 ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
     
      Company Adress: 5G Kernel coder, At post-Pune, State- Maharashtra, Country- India.
      
      </div>
    </MDBFooter>
  );
}