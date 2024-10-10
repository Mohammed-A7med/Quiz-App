import { Link } from "react-router-dom"
import img from "../../../../assets/img.png"
import userimg from "../../../../assets/user img.png"
export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-12 gap-3 ">
        <div className="col-span-6 border-2 rounded-lg flex flex-col p-8">
          <div className="heading flex justify-between">
            <h1 className="text-2xl font-bold">Upcoming 5 quizzes</h1>
            <Link to="/dashboard/quizzes">
              <span className="mx-2 font-bold">Quiz directory</span>
              <i className="fas fa-arrow-right apply-green"></i>
            </Link>
          </div>
          <div className="flex flex-col">
            {[
              {
                title: `Introduction to computer programming`,
                date: `12 / 03 / 2023`,
                time: "09:00 AM",
                enrolledStudents: 30,
              },
              {
                title: `Introduction to computer programming`,
                date: `12 / 03 / 2023`,
                time: "09:00 AM",
                enrolledStudents: 30,
              },
              {
                title: `Introduction to computer programming`,
                date: `12 / 03 / 2023`,
                time: "09:00 AM",
                enrolledStudents: 30,
              },
              {
                title: `Introduction to computer programming`,
                date: `12 / 03 / 2023`,
                time: "09:00 AM",
                enrolledStudents: 30,
              },
            ].map((quiz, index) => (
              <div key={index} className="quiz-card border-2 rounded-lg my-3">
                <div className="flex gap-3">
                  <div className="bg-[#FFEDDF] p-3">
                    <img src={img} alt="" />
                  </div>
                  <div className="flex flex-col p-3">
                    <div className="flex justify-between flex-col">
                      <h3 className="text-lg font-bold">{quiz.title}</h3>
                      <div className="date-time my-1">
                        <p>
                          {quiz.date} | {quiz.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">
                        No. of student’s enrolled: {quiz.enrolledStudents}
                      </p>
                      <Link to="/dashboard/quiz/id" className="">
                        <span className="mx-2 font-bold">Open</span>
                        <i className="fas fa-arrow-right apply-bg-green text-white px-2 p-1 rounded-full"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-6 border-2 rounded-lg flex flex-col p-8">
          <div className="heading flex justify-between">
            <h1 className="text-2xl font-bold">Top 5 Students</h1>
            <Link to="/dashboard/quizzes">
              <span className="mx-2 font-bold">All Students </span>
              <i className="fas fa-arrow-right apply-green"></i>
            </Link>
          </div>
          <div className="flex flex-col">
            {[
              {
                name: `Emmanuel James`,
                rank: `2nd`,
                time: "09:00 AM",
                score: 87,
              },
              {
                name: `Emmanuel James`,
                rank: `2nd`,
                time: "09:00 AM",
                score: 87,
              },
              {
                name: `Emmanuel James`,
                rank: `2nd`,
                time: "09:00 AM",
                score: 87,
              },
              {
                name: `Emmanuel James`,
                rank: `2nd`,
                time: "09:00 AM",
                score: 87,
              },
            ].map((stu, index) => (
              <div key={index} className="quiz-card border-2 rounded-lg my-3">
                <div className="grid grid-cols-6 gap-3">
                  <div
                    className="col-span-1 bg-no-repeat bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url('${userimg}')` }}
                  ></div>
                  <div className="col-span-5 flex w-full items-center justify-between p-3">
                    <div className="flex justify-between flex-col">
                      <h3 className="text-lg font-bold">{stu.name}</h3>
                      <div className="my-1">
                        <p>
                          Class rank: {stu.rank} | Average score: {stu.score}%
                        </p>
                      </div>
                    </div>
                    <Link to="/dashboard/student/id" className="">
                      <i className="fas fa-arrow-right bg-black text-white p-2 rounded-full"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
