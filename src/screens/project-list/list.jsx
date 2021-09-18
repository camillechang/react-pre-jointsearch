import { Table } from "antd";

export const List = ({ list, managers }) => {
  const columns = [{
    title: "ProjectName",
    dataIndex: "ProjectName",
    key: "ProjectName"
  },
  {
    title: "Manager",
    dataIndex: "Manager",
    key: "Manager"
  }
  ]

  const data = []
  list.map((project) => {
    const info = {
      key: project.id,
      ProjectName: project.name,
      Manager: managers.find((manager) => manager.id === project.manager_id)?.name || "unknown"
    }
    data.push(info);
  });


  return <Table columns={columns} dataSource={data} />;

  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>Project Name</th>
  //         <th>Manager</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.id}>
  //           <td>{project.name}</td>
  //           <td>
  //             {managers.find((manager) => manager.id === project.manager_id)
  //               ?.name || "unknown"}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};