import Image from "next/image";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import profileDefault from "@/assets/images/profile.png";
import ProfileProperties from "@/components/ProfileProperties";
import { convertToSerializeableObject } from "@/utils/convertToObject";

const ProfilePage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  if (!userId) {
    throw new Error("User ID is required");
  }

  const propertiesDoc = await Property.find({ owner: userId }).lean();
  const properties = propertiesDoc.map(convertToSerializeableObject);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-16 mt-10 mb-14">
              <Image
                className="h-32 w-32 md:h-40 md:w-40 rounded-full mx-auto mb-10"
                src={sessionUser?.user?.image || profileDefault}
                alt="User"
                width={120}
                height={120}
              />

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>{" "}
                {sessionUser?.user?.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>{" "}
                {sessionUser?.user?.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-500 from-5% to-blue-500 to-15% bg-clip-text text-transparent mb-4">
                Your Listings
              </h2>
              {properties.length === 0 ? (
                <p>No new added properties</p>
              ) : (
                <ProfileProperties properties={properties} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
