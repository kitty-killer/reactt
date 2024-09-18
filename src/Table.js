import React from "react";

const Table = ({ workers, delWorker }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {workers.map((worker, index) => {
                    return (
                        <tr key={index}>
                            <td>{worker.name}</td>
                            <td>{worker.job}</td>
                            <td>
                                <button onClick={() => delWorker(worker.id)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
export default Table;