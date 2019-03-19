export interface IStudent{
    academicProgram: string,
    studentId: string,
    familyName: string,
    givenName: string,
    birthDate: string,
    email: string,
    academicLevel: number,
    gpa:number,
    credits:[{
      courseCode: string,
      courseName: string,
      termCompleted: string,
      gradeEarned: string
    }]
  }