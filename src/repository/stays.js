import { BACKEND_URL } from "../config";
import {dateFormatterToIso} from '../components/widgets/DatePicker/datePicker'

export async function GetStaysRepository(pageNumber, pageSize) {
    let newUrl = BACKEND_URL + "/stays?pageNumber=" + pageNumber + "&pageSize=" + pageSize;
    const response = await fetch(newUrl, {
        headers: {
            Origin: "*",
        },
    });
    if (response.status === 200) return response.json();
    else return [];
}

export async function GetStaysWithParamsRepository(pageNumber, pageSize, searchParams) {

    const propToString = (props) => {
        let s = ""
        for (let p of props) {
            s += "prop=" + p + "&"
        }
        return s.slice(0, -1)
    }

    const getString = (k, v) => {
        if (k === "dateFrom" || k === "dateTo")
            v = dateFormatterToIso(v)
        if (k === "propertice")
            return ""
        if (v) {
            return String.raw`${k}=${v}&`
        }
        else return ""
    }

    let url = BACKEND_URL + "/stays?pageNumber=" + pageNumber + "&pageSize=" + pageSize
    if (searchParams) {
        url += "&"
        for (const [key, value] of Object.entries(searchParams)) {
            url += getString(key, value)
        }

        url = url.slice(0, -1) + "&" + propToString(searchParams.propertice)
    }
    const response = await fetch(url, {
        headers: {
            Origin: "*",
        },
    });
    return response
}

export async function GetStaysByUsername(username, pageNumber, pageSize) {
    let newUrl = BACKEND_URL + "/stays?pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&username=" + username;
    const response = await fetch(newUrl, {
        headers: {
            Origin: "*",
        },
    });
    if (response.status === 200) return response.json();
    else return [];
}