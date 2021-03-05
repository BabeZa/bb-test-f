import React, { useState, useEffect, useMemo } from 'react';
import PostgreAPI from "../apis/PostgreAPI";
import { Table,Container,Row,Col,Button } from 'react-bootstrap';
import moment from 'moment';
import Select from 'react-select'
import { useHistory } from 'react-router-dom';

export default function Home() {

    const history = useHistory();

    const [ top3Data, setTop3Data ] = useState({});
    const [ topBudgetData, setTopBudgetData ] = useState({});
    const [ top99Data, setTop99Data ] = useState({});

    useEffect(() => {
        PostgreAPI.get("/project/top3")
            .then((res) => {
                setTop3Data (res.data);
                // setLoadingFaculty(true)
                console.log("setTop3Data : ",res.data);
            })
            .catch((error) => {
                console.error(error)
            });
    }, []);

    useEffect(() => {
        PostgreAPI.get("/project/topbudget")
            .then((res) => {
                setTopBudgetData (res.data);
                // setLoadingFaculty(true)
                console.log("setTopBudgetData : ",res.data);
            })
            .catch((error) => {
                console.error(error)
            });
    }, []);

    useEffect(() => {
        PostgreAPI.get("/project/top99")
            .then((res) => {
                setTop99Data (res.data);
                // setLoadingFaculty(true)
                console.log("setTop99Data : ",res.data);
            })
            .catch((error) => {
                console.error(error)
            });
    }, []);

    
    
return (
    <>
        <div >
        <Container>
            <br/>
            <h3>แสดงรายการภาคที่มีจำนวนโครงการมากที่สุด 3 ภาค</h3>
            <h3>และแสดงจำนวนโครงการในแต่ละภาคโดยเรียงจากมากไปน้อย</h3>
            {top3Data.length > 0 ? top3Data.map((el, index) => (
                <Row>
                    <Col xs={2}>ลำดับที่ {index+1}</Col>
                    <Col xs={4}>ภาค : {el.region}</Col>
                    <Col xs={6}>จำนวน : {el.region_count} โครงการ</Col>
                </Row>
            )) : ""}
            
            <br/>
            <h3>แสดงผลรวมของเงินงบประมาณแต่ละจังหวัด โดยเรียงจากผลรวมที่มากไปน้อย</h3>
            {topBudgetData.length > 0 ? topBudgetData.map((el, index) => (
                <Row>
                    <Col xs={2}>ลำดับที่ {index+1}</Col>
                    <Col xs={4}>ภาค : {el.province}</Col>
                    <Col xs={6}>จำนวน : {el.sum} บาท</Col>
                </Row>
            )) : ""}
            <br/>
            <h3>แสดงจำนวนเงินงบประมาณ, จำนวนโครงการ, จำนวนงบประมาณที่มากที่สุด, </h3>
            <h3>จำนวนงบประมาณที่น้อยที่สุด ของแต่ละประเภทโครงการ โดยเรียงตามชื่อประเภท</h3>
            <Row>
                    <Col xs={2}>ชื่อประเภท</Col>
                    <Col xs={2}>จำนวนเงิน</Col>
                    <Col xs={2}>จำนวนโครงการ</Col>
                    <Col xs={3}>จำนวนงบประมาณที่มากที่สุด</Col>
                    <Col xs={3}>จำนวนงบประมาณที่น้อยที่สุด</Col>
                </Row>
            {top99Data.length > 0 ? top99Data.map((el, index) => (
                <Row>
                    <Col xs={2}>{el.project_type}</Col>
                    <Col xs={2}>{el.sum}</Col>
                    <Col xs={2}>{el.count}</Col>
                    <Col xs={3}>{el.max}</Col>
                    <Col xs={3}>{el.min}</Col>
                </Row>
            )) : ""}
        
            
        {/* <Table className="home-table">
            <thead>
                <tr>
                    <th>ลำดับ</th>
                    <th>ชื่อโครงการ</th>
                    <th>ประเภท</th>
                    <th>จังหวัด</th>
                    <th>ภาค</th>
                    <th>เริ่มต้น</th>
                    <th>แก้ไข</th>
                </tr>
            </thead>
            <tbody>
                {allProject.length > 0 ? allProject.map((el, index) => (
                        <tr>
                            <td><h4>{index + 1}</h4></td>
                            <td>{el.name}</td>
                            <td>{el.project_type}</td>
                            <td>{el.province}</td>
                            <td>{el.region}</td>
                            <td>{moment(el.start_date).format("DD/MM/YYYY")}</td>
                            <td><Button type="button" onClick={() => editHandle(el.id)} className="mb-2" variant="warning">แก้ไข</Button></td>
                        </tr>
                )) : " "}
            </tbody>
        </Table> */}
        </Container>

        </div>
    </>
)
}
