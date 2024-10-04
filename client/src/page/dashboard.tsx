import './dashboard.module.css';

import { useAppSelector } from "@/store/hooks"

const Dashboard = () => {
  const { user } = useAppSelector(state => state.user);
  return (
    user && <main className='flex flex-col gap-y-4'>
      <h3>Profile</h3>
      <header className="flex gap-x-5">
        <img src="/police.png" alt="police" className="size-60 bg-gray-200 rounded-lg p-2" />
        <section>
          <table>
            <tbody>
              <tr>
                <td>Name: </td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Phone Number: </td>
                <td>{user.phoneNumber}</td>
              </tr>
              <tr>
                <td>Designation: </td>
                <td>{user.designation}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </header>
    </main>
  )
}

export default Dashboard