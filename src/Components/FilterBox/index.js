import React from "react"
import { useState, useEffect } from "react"
import "./FilterBox.css"
import { Col, Row, Form, Select } from "antd"
import { getGenre, getNation } from "../../Helper";
import { useQuery } from "@tanstack/react-query";
function FilterBox(prop) {
    let Option_Nation = [
        {
            "value": "US",
            "label": "Hoa Kỳ"
        },
        {
           "value": "CN",
            "label": "Trung Quốc"
        },
        {
            "value": "CA",
           "label": "Canada"
        },
        {
           "value": "FR",
            "label": "Pháp"
        },
        {
            "value": "DE",
            "label": "Đức"
        },
        {
            "value": "ES",
            "label": "Tây Ban Nha"
        },
        {
            "value": "GB",
           "label": "Vương quốc Anh"
        },
        {
            "value": "IN",
            "label": "Ấn Độ"
        },
        {
            "value": "KR",
            "label": "Hàn Quốc"
        },
        {
            "value": "MX",
            "label": "Mexico"
        },
    ]
    let Option_Nam = []
    const loadNam = () => {
        for (let i = 1997; i <= 2024; i++) {
            const item = {
                "label": i,
                "value": i
            }
            Option_Nam.push(item)
        }
    }
    loadNam()
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
                className="form__item"
                name={"quocgia"}
                style={{ width: 150 }}
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
                style={{ width: 150 }}
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

export default FilterBox;