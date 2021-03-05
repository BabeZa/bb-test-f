import React, { useState, useEffect, useMemo } from 'react';
import PostgreAPI from "../apis/PostgreAPI";
import { Form, Row, Col, Button, Container  } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Select from 'react-select'
import { useHistory } from 'react-router-dom';
import { toast} from "react-toastify";

export default function Edit(props) {

    const history = useHistory();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [ provinceData, setProvinceData ] = useState({});
    const [ provinceSelect, setProvinceSelect ] = useState({value: null, label: 'ไม่ระบุ'});

    const [ typeData, setTypeData ] = useState({});
    const [ typeSelect, setTypeSelect ] = useState({value: null, label: 'ไม่ระบุ'});
    
    // จริงๆควรเป็น projectData 
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
        is_research_project:false,
        successful: false
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

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setAllProject({...allProject, [e.target.name]:value}) 
    }

    const handleChangeE = (date) => {
        setEndDate(date)
        setAllProject({...allProject, end_date:date});
    }
    const handleChangeS = (date) => {
        setStartDate(date)
        setAllProject({...allProject, start_date:date});
    }


    useEffect(() => {
        console.log("props.match.params.id:", props.match.params.id);
        PostgreAPI.get('project/get/'+props.match.params.id)
            .then((res) => {
                setAllProject(res.data);
                console.log("res.data:", res.data);
                setEndDate(new Date(res.data.end_date))
                setStartDate(new Date(res.data.start_date))
            })
            .catch((error) => {
                console.error(error)
            });
    }, [])
    

    // -------------------------------------------------------------------------------------------------------
    useEffect(() => {
        if(allProject.successful === true){

        }
        PostgreAPI.get("/forselect/province")
            .then((res) => {
                setProvinceData(res.data);
                // setLoadingFaculty(true)
                console.log("province: ",res.data);
                setProvinceSelect(res.data.find(obj => obj.value === allProject.province_id));
            })
            .catch((error) => {
                console.error(error)
            });
    }, [allProject]);

    const handleProvinceSelect = (selectedOption) => {
        setAllProject({...allProject, province_id : selectedOption.value});
        setProvinceSelect(provinceData.find(obj => obj.value === selectedOption.value));
    }

    // -------------------------------------------------------------------------------------------------------
    useEffect(() => {
        PostgreAPI.get("/forselect/project_type")
            .then((res) => {
                setTypeData(res.data);
                // setLoadingFaculty(true)
                console.log("project_type: ",res.data);
                setTypeSelect(res.data.find(obj => obj.value === allProject.project_type_id));
            })
            .catch((error) => {
                console.error(error)
            });
    }, [allProject]);

    const handleTypeSelect = (selectedOption) => {
        setAllProject({...allProject, project_type_id : selectedOption.value});
        setTypeSelect(typeData.find(obj => obj.value === selectedOption.value));
    }

    // -------------------------------------------------------------------------------------------------------
    const updateProject = () => {
        try {
            PostgreAPI.put('/project/update/'+props.match.params.id, allProject)
            .then((res) => {
                // toast.success("Update Successfully!");
                alert("Update Successfully!")
            })
            .catch((error) => {
                console.error(error)
            });
        } catch (error) {
            console.log(error)
        }
    }

    const backback = () =>{
        history.push('/');
    }
    
    
return (
    <>
        <Container>
            <br/>
        <Form >
            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">ชื่อโครงการ</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" value={allProject.name} name="name" onChange={handleChange} placeholder="ชื่อโครงการ" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">รายละเอียดโครงการ</Form.Label>
                <Col sm="10">
                    <Form.Control as="textarea" rows={3} value={allProject.detail} name="detail" onChange={handleChange} placeholder="รายละเอียด" />
                </Col>
            </Form.Group>
        
            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">ประเภท</Form.Label>
                <Col sm="10">
                    <Select options={provinceData} value={provinceSelect} isSearchable={false} onChange={handleProvinceSelect} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">จังหวัด</Form.Label>
                <Col sm="10">
                    <Select options={typeData} value={typeSelect} isSearchable={false} onChange={handleTypeSelect} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">เริ่มต้น</Form.Label>
                <Col sm="10">
                    <DatePicker selected={startDate} onChange={date => handleChangeS(date)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">สิ้นสุด</Form.Label>
                <Col sm="10">
                    <DatePicker selected={endDate} onChange={date => handleChangeE(date)} />
                </Col>
            </Form.Group>

            
            <Form.Group as={Row} controlId="1">
                <Form.Label column sm="2">งบประมาณ</Form.Label>
                <Col sm="10">
                    <Form.Control type="number" value={allProject.budget} name="budget" onChange={handleChange} placeholder="งบประมาณ" />
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
                    <Form.Control type="number" value={allProject.budget_support} name="budget_support" onChange={handleChange} placeholder="งบประมาณ" />
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

            <Button type="button" className="mb-2" onClick={() => updateProject()}>บันทึก</Button>
            <Button type="button" className="mb-2" onClick={() => backback()} variant="secondary">กลับ</Button>
            </Form>
            {/* <div style={{ marginTop: 20 }}><pre>{JSON.stringify(allProject, null, 2)}</pre></div> */}
        </Container>
    </>
)
}
