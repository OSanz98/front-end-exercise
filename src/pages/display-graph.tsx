import React from 'react';
import Footer from '../components/Footer';

const startDate = new Date();
const maxTemperature = 12;
const minTemperature = -2;

const data = [
    {
        test_day: 'Day 0',
        temperature: 6.23426,
        spoilage: 0,
        sensor_id: 'sens_1',
    },
    {
        test_day: 'Day 1',
        temperature: 5.57987,
        spoilage: 0,
        sensor_id: 'sens_1',
    },
    {
        test_day: 'Day 2',
        temperature: 6.02342,
        spoilage: 3,
        sensor_id: 'sens_1',
    },
    {
        test_day: 'Day 3',
        temperature: 4.78899,
        spoilage: 6,
        sensor_id: 'sens_1',
    },
    {
        test_day: 'Day 4',
        temperature: 6.56231,
        spoilage: 8,
        sensor_id: 'sens_1',
    },
    {
        test_day: 'Day 5',
        temperature: 6.00323,
        spoilage: 11,
        sensor_id: 'sens_1',
    },
    {
        test_day: 'Day 6',
        temperature: 6.67221,
        spoilage: 19,
        sensor_id: 'sens_1',
    },
];


export default function DisplayGraph() {
    return (
        <>
            <div className="">
                <p>Graph should go here!</p>
            </div>
            <div>
                <p>Div showing chart/tooltip information should be beside the graph</p>
            </div>
            <Footer>Click me!</Footer>
        </>
    );
}
