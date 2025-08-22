import Ping from "@/components/Ping";
import { getPostViews, incrementPostViews } from "@/lib/posts";
import { after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const totalViews = await getPostViews(id);

  after(
    async () =>
      await incrementPostViews(id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};
export default View;
