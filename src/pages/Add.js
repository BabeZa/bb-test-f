import React, { useState, useEffect, useMemo } from 'react';
import PostgreAPI from "../apis/PostgreAPI";
import { Form, Row, Col, Button  } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Select from 'react-select'

export default function Add() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [iBudgetSupport, setIBudgetSupport] = useState(false);
    const [allProject, setAllProject] = useState({
        name: "",
        detail: "",
        project_type_id:null,
        province_id:null,
        start_date:null,
        end_date:null,
        budget:0,
        is_support:false,
        budget_support:0,
        is_improvement_project:false,
        is_innovation_project:false,
        is_research_project:false
        });

    const handleChangeBS = (e) =>{
        e.persist();
        const value = e.target.value;
        console.log("value:",value);
        if(value === 'true'){
            setAllProject({...allProject, is_support:true})
        }else if(value === 'false'){
            setAllProject({...allProject, is_support:false})
        } 
    }
    const handleChangePD = (e) =>{
        e.persist();
        const name = e.target.name;
        const value = e.target.checked;
        console.log("name + value:",value, name);
        setAllProject({...allProject, [e.target.name]:value}) 
    }
    
return (
    <>
        <div >
        <Form>
            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">ชื่อโครงการ</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="ชื่อโครงการ" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">รายละเอียดโครงการ</Form.Label>
                <Col sm="10">
                    <Form.Control as="textarea" rows={3} placeholder="รายละเอียด" />
                </Col>
            </Form.Group>
        
            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">ประเภท</Form.Label>
                <Col sm="10">
                <Select  />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">จังหวัด</Form.Label>
                <Col sm="10">
                <Select  />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">เริ่มต้น</Form.Label>
                <Col sm="10">
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">สิ้นสุด</Form.Label>
                <Col sm="10">
                    <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                </Col>
            </Form.Group>

            
            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">งบประมาณ</Form.Label>
                <Col sm="10">
                    <Form.Control type="number" placeholder="งบประมาณ" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">งบสนับสนุนอื่น</Form.Label>
                <Col sm="10">
                    <Form.Check type="radio" value='true' onChange={handleChangeBS} checked={allProject.is_support === true} label="มี" />
                    <Form.Check type="radio" value='false' onChange={handleChangeBS} checked={allProject.is_support === false}  label="ไม่มี" />
                </Col>
            </Form.Group>

            {allProject.is_support && <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">งบประมาณ</Form.Label>
                <Col sm="10">
                    <Form.Control type="number" placeholder="งบประมาณ" />
                </Col>
            </Form.Group>}

            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">ลักษณะโครงการ</Form.Label>
                <Col sm="10">
                    <Form.Check type="checkbox" name="is_improvement_project" onChange={handleChangePD} checked={allProject.is_improvement_project === true} label="เป็นโครงการปรับปรุงงาน" />
                    <Form.Check type="checkbox" name="is_innovation_project" onChange={handleChangePD} checked={allProject.is_innovation_project === true} label="เป็นโครงการนวัตกรรม" />
                    <Form.Check type="checkbox" name="is_research_project" onChange={handleChangePD} checked={allProject.is_research_project === true} label="เป็นโครงการวิจัยและพัฒนา" />
                </Col>
            </Form.Group>

            
            
            <Button type="submit" className="mb-2">Submit</Button>
            </Form>

        </div>
    </>
)
}
