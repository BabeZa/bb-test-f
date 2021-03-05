import React, {useState, useEffect, useContext, useMemo} from 'react';
import { Link } from 'react-router-dom';
import PostgreAPI from '../apis/PostgreAPI'
import { useHistory } from 'react-router-dom';
import { Nav, Form, Button, FormControl, Navbar } from 'react-bootstrap';


function MyNavbar() {
    
    return (
        
        <>
            <Navbar bg="dark" variant="dark">
                
                {/* <Navbar.Brand href="/">Navbar</Navbar.Brand> */}
                <Nav className="mr-auto">
                <Nav.Link href="/">หน้ารายการ</Nav.Link>
                <Nav.Link href="/add">หน้าเพิ่มข้อมูล</Nav.Link>
                <Nav.Link href="/report">หน้ารายงาน</Nav.Link>
                </Nav>
                <Form inline>
                
                    <Button href="/add" variant="outline-success">NEW +</Button>
                </Form>
            </Navbar>
        </>
    )
}

export default MyNavbar
