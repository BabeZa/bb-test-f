import React, { useState, useEffect, useMemo } from 'react';
import PostgreAPI from "../apis/PostgreAPI";
import { Table,Container,Row,Col,Button } from 'react-bootstrap';
import moment from 'moment';
import Select from 'react-select'
import { useHistory } from 'react-router-dom';

export default function Home() {

    const history = useHistory();

    const [ provinceData, setProvinceData ] = useState({});
    const [ provinceSelect, setProvinceSelect ] = useState({value: null, label: 'ทั้งหมด'});

    const [ typeData, setTypeData ] = useState({});
    const [ typeSelect, setTypeSelect ] = useState({value: null, label: 'ทั้งหมด'});

    const [allProject, setAllProject] = useState({
        name:"",
        project_type:"",
        province:"",
        region:"",
        start_date:""
    });
    
    useEffect(() => {
        const body = {
            province: provinceSelect,
            type: typeSelect
        }
        PostgreAPI.post('project/filter',body)
            .then((res) => {
                setAllProject(res.data);
                console.log("res.data:", res.data);
            })
            .catch((error) => {
                console.error(error)
            });
    }, [provinceSelect,typeSelect])


    // -------------------------------------------------------------------------------------------------------
    useEffect(() => {
        PostgreAPI.get("/forselect/provincef")
            .then((res) => {
                setProvinceData(res.data);
                // setLoadingFaculty(true)
                console.log("province: ",res.data);
            })
            .catch((error) => {
                console.error(error)
            });
    }, []);

    const handleProvinceSelect = (selectedOption) => {
        setAllProject({...allProject, province_id : selectedOption.value});
        setProvinceSelect(provinceData.find(obj => obj.value === selectedOption.value));
    }

    // -------------------------------------------------------------------------------------------------------
    useEffect(() => {
        PostgreAPI.get("/forselect/project_typef")
            .then((res) => {
                setTypeData(res.data);
                // setLoadingFaculty(true)
                console.log("project_type: ",res.data);
            })
            .catch((error) => {
                console.error(error)
            });
    }, []);

    const handleTypeSelect = (selectedOption) => {
        setAllProject({...allProject, project_type_id : selectedOption.value});
        setTypeSelect(typeData.find(obj => obj.value === selectedOption.value));
    }

    // -------------------------------------------------------------------------------------------------------


    const editHandle = (id) =>{
        history.push('/edit/'+id);
    }
    
return (
    <>
        <div >
        <Container>
            <br/>
            <Row>
                <Col xs={6}>จังหวัด:  <Select options={provinceData} value={provinceSelect} isSearchable={false} onChange={handleProvinceSelect} /></Col>
                <Col xs={6}>ประเภท: <Select options={typeData} value={typeSelect} isSearchable={false} onChange={handleTypeSelect} /></Col>
            </Row>
            <br/>
        
            
        <Table className="home-table">
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
        </Table>
        </Container>

        </div>
    </>
)
}
