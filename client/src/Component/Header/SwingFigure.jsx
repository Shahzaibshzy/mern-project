import img from "../../../public/banner.png"
const SwingFigure = () => {
  return (
    <figure className="hidden lg:flex absolute top-0 left-1/3 transform -translate-x-1/2 z-50">
      <img
        src="/banner.png"
        alt="white-label-20percent"
        title="white-label-20percent"
        loading="lazy"
        className="animate-swing origin-swing  h-44 float-left "
      />
    </figure>
  );
};

export default SwingFigure;
