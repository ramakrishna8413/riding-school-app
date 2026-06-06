import Layout from "../components/Layout";

function Profile() {
  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">
          👤 Admin Profile
        </h1>

        <div className="max-w-2xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-md">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
              A
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              Administrator
            </h2>

            <p className="text-gray-500">
              Horse Riding School Management System
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="bg-white p-4 rounded-xl border">
              <p className="text-gray-500">
                Username
              </p>
              <p className="font-semibold">
                admin
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border">
              <p className="text-gray-500">
                Role
              </p>
              <p className="font-semibold">
                System Administrator
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border">
              <p className="text-gray-500">
                Access Level
              </p>
              <p className="font-semibold text-green-600">
                Full Access
              </p>
            </div>
          </div>

          <div className="mt-8">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;