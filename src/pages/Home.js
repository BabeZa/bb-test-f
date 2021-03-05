import React, { useState, useEffect, useMemo } from 'react';
import PostgreAPI from "../apis/PostgreAPI";
import { Table } from 'react-bootstrap';

export default function Home() {

    const [allProject, setAllProject] = useState({
        name:"",
        project_type:"",
        province:"",
        region:"",
        start_date:""
    });
    
    useEffect(() => {
        PostgreAPI.get('project/all')
            .then((res) => {
                setAllProject(res.data);
                console.log("res.data:", res.data);
            })
            .catch((error) => {
                console.error(error)
            });
    }, [])
    
return (
    <>
        <div >
            
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
                            <td>{el.start_date}</td>
                        </tr>
                )) : " "}
            </tbody>
        </Table>

        </div>
    </>
)
}
