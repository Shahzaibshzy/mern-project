import img from "../../../public/banner.png"
const SwingFigure = () => {
  return (
    <figure className="block my-4 mx-10">
      <img
        src={img}
        alt="white-label-20percent"
        title="white-label-20percent"
        width="87"
        height="72"
        loading="lazy"
        className="animate-swing origin-swing float-left "
      />
    </figure>
  );
};

export default SwingFigure;
