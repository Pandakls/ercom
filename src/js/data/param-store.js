//Externals
import _ from 'lodash';
import moment from 'moment';
//DAta
import rawData from './data';

const initialValues = {
    max: 0,
    min: 0,
    average: 0,
    overThresh: 0,
    underThresh: 0,
    valueThresh: 0
}

let callbackFunction = [];

let minDate = _.minBy(rawData, 'time').time;
let maxDate = _.maxBy(rawData, 'time').time;

let params = {
    dateStart : moment(minDate, 'DD-MM hh:mm:ss'),
    dateEnd: moment(maxDate, 'DD-MM hh:mm:ss'),
    analysedData : 'files',
    fullPeriod: true,
    threshold: 42    
}

let values = {};
Object.assign(values, initialValues);


function addListener(func){
    callbackFunction.push(func);
}

function removeListener(func){
    let index = callbackFunction.indexOf(func);
    if(index > -1){
        callbackFunction.splice(index, 1);
    }
}

function getParams(){
    return params;
}

function getValues(){
    return values;
}

function filterDataWithDates(rawData, dateStart, dateEnd){
    let res = [];
    for(let i=0; i<rawData.length; i++){
        const date = moment(rawData[i].time, 'DD-MM hh:mm:ss').format();
        if(date <= dateEnd.format() && date >= dateStart.format()){
            res.push(rawData[i]);
        }
    }
    return res;
}

function computeNewValues(){
    let dataList = rawData;
    let attr = params.analysedData;
    if(!params.fullPeriod){
        dataList = filterDataWithDates(rawData, params.dateStart, params.dateEnd);
    }
    if(dataList.length < 1){
        Object.assign(values, initialValues);
        return;
    }

    values.max = _.maxBy(dataList, attr)[attr];
    values.min = _.minBy(dataList, attr)[attr];
    values.average = Math.round(_.meanBy(dataList, attr)*100)/100;
    values.valueThresh = ((values.max - values.min) * params.threshold ) / 100 + values.min;
    let countOver = 0;
    let countUnder = 0;
    for(let i=0; i<dataList.length; i++){
        if(dataList[i][attr] > values.valueThresh){
            countOver ++;
        } else if (dataList[i][attr] < values.valueThresh){
            countUnder ++;
        }
    }
    values.valueThresh = Math.round(values.valueThresh *100)/100;
    values.overThresh = Math.round(countOver / (countOver + countUnder)*10000)/100 + '%';
    values.underThresh = Math.round(countUnder / (countOver + countUnder)*10000)/100+ '%';
}

function setParam(newParams){
    params = _.assign(params, newParams);
    computeNewValues();
    for(let i = 0; i<callbackFunction.length; i++){
        callbackFunction[i]();
    }
}

computeNewValues();

export default {
    addListener,
    removeListener,
    getParams,
    getValues,
    setParam
}
