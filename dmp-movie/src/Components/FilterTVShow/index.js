import React from "react"
import { useState, useEffect } from "react"
import "./FilterTV.css"
import { Form, Select } from "antd"
import { getGenreTV } from "../../Helper";
import { useQuery } from "@tanstack/react-query";
function FilterTV(prop) {
    const [genre, setGenre] = useState(null);
    let Option_Genre = []
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
    const { data } = useQuery({
        queryKey: ["Genre"],
        queryFn: getGenreTV,
        staleTime: Infinity,
        cacheTime: Infinity
    })
    useEffect(() => {
        setGenre(data?.genres)
    }, [data])
    const loadSelect = () => {
        if (genre) {
            for (let i = 0; i < genre.length; i++) {
                const item = {
                    "label": genre[i].name,
                    "value": genre[i].id,
                }
                Option_Genre.push(item)
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
                name={"with_genres"}
                className="form__item"
                style={{ width: 150 }}
            >
                <Select
                    placeholder="Thể loại"
                    allowClear
                    options={Option_Genre}
                />
            </Form.Item>
            <Form.Item
                className="form__item"
                name={"with_origin_country"}
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
                name={"primary_release_year"}
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
                <button tyle="submit" className="filtertv__search">Tìm kiếm</button>
            </Form.Item>
        </Form>
    );
}

export default FilterTV;