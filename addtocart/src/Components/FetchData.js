// import React, { useState, useEffect } from 'react';
// import './FetchData.css'

// const FetchData = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:3001/foodData')
//             .then(res => res.json())
//             .then(data => setData(data));
//     }, []);

//     if (!data) return <div>Loading...</div>;

//     return (
//         <div>
//             {data.map(item => (
//                 <div key={item._id} className="item">
//                     <h2>{item.name}</h2>
//                     <img src={item.img} alt={item.name} />
//                     <p>{item.description}</p>
//                     <ul>
//                         {item.options.map((option, index) => (
//                             <li key={index}>
//                                 Half: {option.half} | Full: {option.full}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default FetchData;
