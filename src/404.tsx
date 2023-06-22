const NotFound = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1>Adventurer, you've gone too far. It is time to turn back now.</h1>
        <img
          className="w-[250px] rounded"
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I2MGRmNjUxNmM4OTQwZjg0MzFiZTMyY2Y1N2Y2YTQ0ZTYzNjE1NCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/TcdpZwYDPlWXC/giphy.gif"
          alt="Trust, turn back. There's nothing here."
        />
        <a
          className="px-3 py-2 my-4 text-black no-underline rounded border-1"
          href="/"
        >
          Turn Back
        </a>
      </div>
    </div>
  );
};

export default NotFound;
