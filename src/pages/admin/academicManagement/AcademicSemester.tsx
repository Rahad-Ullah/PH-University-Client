import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);
  console.log(data?.data);
  const semesters = data?.data;

  return (
    <div>
      <h1 className="text-4xl font-bold">This is Academic Semester </h1>
      {semesters &&
        semesters.map((item) => (
          <h1 key={item._id} className="text-3xl">
            {item.name} {item.startMonth} {item.year}
          </h1>
        ))}
    </div>
  );
};

export default AcademicSemester;
