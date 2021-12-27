import Image from "next/image";
import Link from "next/link";

const Main = ({ user }) => (
  <div className="dashboard">
    <div className="dashboard-header">
      <h2 className="dashboard-header-title">
        {`Welcome ${user.user_first_name} ${user.user_last_name}`}
      </h2>
    </div>

    <div className="dashboard-body">
      <span className="dashboard-body-text">
        Are you ready to launch your blog?
        <Link href="/admin/new-blog" passHref>
          <button className="btn__active ml1 not-block">
            Create your blog
          </button>
        </Link>
      </span>
      <Image
        src="/blogs_launcher.gif"
        width={480}
        height={400}
        alt="blogs launcher"
      />
    </div>
  </div>
);

export default Main;
