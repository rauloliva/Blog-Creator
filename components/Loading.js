import Image from "next/image";

const Loading = () => {
  return (
    <div className="spinner-page">
      <span className="spinner-paragraph">
        We are processing your request. <br />
        Please wait a moment.
      </span>

      <div className="spinner-container">
        <Image
          src="/loading.gif"
          width={300}
          height={300}
          alt="loading spinner"
        />
      </div>
    </div>
  );
};

export default Loading;
