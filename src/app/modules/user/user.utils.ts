import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0'); // 00000
  //increament by 1
  let increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  increamentedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${increamentedId}`;
  return increamentedId;
};

export const findLastFacultyID = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne(
    {
      role: 'Faculty',
    },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyID()) || (0).toString().padStart(5, '0');
  let increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  increamentedId = `F-${increamentedId}`;
  return increamentedId;
};
