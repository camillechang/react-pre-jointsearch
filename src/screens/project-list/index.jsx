import { useState, useEffect } from "react";
import { List } from "./list";
import { isTrue, cleanObject } from "../utils";
import { SearchPanel } from "./search-panel";
import * as qs from "qs";
import pipe from "lodash/fp/pipe";

// const apiURL = process.env.REACT_APP_API_URL;

const apiURL = "http://localhost:5566";
export const ProjectSearchList = () => {
    const [param, setParam] = useState({ project_name: "", manager_id: "" }); // param.manager_id param.project_name
    const [managers, setManagers] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`${apiURL}/managers`).then(async (response) => {
            if (response.ok) {
                setManagers(await response.json());
            }
        });
    }, []);

    const changeParamProjectName = (object) => {
        const result = { ...object };
        const value = result["project_name"];
        if (isTrue(value)) {
            result["name"] = value;
            delete result["project_name"];
        }
        return result;
    };
    useEffect(() => {
        // const combineSearch = pipe(
        //     cleanObject,
        //     changeParamProjectName,
        //     qs.stringify
        // );
        fetch(`${apiURL}/projects?${qs.stringify(changeParamProjectName(cleanObject(param)))}`).then(
            async (response) => {
                if (response.ok) {
                    setList(await response.json());
                }
            }
        );
    }, [param]);
    return (<>
        <SearchPanel param={param} setParam={setParam} managers={managers} />
        <List list={list} managers={managers} />
    </>
    );
};