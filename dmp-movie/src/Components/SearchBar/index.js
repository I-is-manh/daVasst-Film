import React from "react"
import { useState, useEffect } from "react"
import "./SearchBar.css"
import { Col, Row, Form, Select } from "antd"
import { getGenre, getNation } from "../../Helper";

function SearchBar(prop) {
    const [genre, setGenre] = useState(null);
    const [nation, setNation] = useState(null);
    let Option_Genre = []
    let Option_Nation = []
    let Option_Nam = []
    useEffect(() => {
        const getListGenre = async () => {
            const data = await getGenre()
            const data2 = await getNation();
            setGenre(data.genres)
            setNation(data2)
        }
        getListGenre()
    }, [])
    const loadSelect = () =>{
        if (genre) {
            for (let i = 0; i < genre.length; i++) {
                const item = {
                    "label": genre[i].name,
                    "value": genre[i].id
                }
                Option_Genre.push(item)
            }
        }
        if (nation) {
            for (let i = 0; i < nation.length; i++) {
                const item = {
                    "label": nation[i].native_name,
                    "value": nation[i].native_name
                }
                Option_Nation.push(item)
            }
        }
        for (let i = 1997; i <= 2024; i++) {
            const item = {
                "label": i,
                "value": i
            }
            Option_Nam.push(item)
        }
    }
    loadSelect()
    const onFinish = (e) => {
        prop.f(e)
    }
    return (
        <Form
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end" }}
            className="form"
            onFinish={onFinish}
        >
            <Form.Item
                name={"theloai"}
                className="form__item"
                style={{width : 150}}
            >
                <Select
                    placeholder="Thể loại"
                    allowClear
                    options={Option_Genre}
                />
            </Form.Item>
            <Form.Item
                className="form__item"
                name={"quocgia"}
                style={{width : 150}}
            >
                <Select
                    allowClear
                    placeholder="Quốc gia"
                    options={Option_Nation}
                />
            </Form.Item>
            <Form.Item
                className="form__item"
                name={"release"}
                style={{width : 150}}
            >
                <Select
                    allowClear
                    placeholder="Năm phát hành"
                    options={Option_Nam}
                />
            </Form.Item>
            <Form.Item
            className="form__item"
            >
                <button tyle="submit" className="searchbar__search">Tìm kiếm</button>
            </Form.Item>
        </Form>
    );
}

export default SearchBar;