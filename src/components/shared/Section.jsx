function Section({ display, children }) {
  const defaultDisplay = "flex flex-col gap-8";

  return (
    <section className={`${display ?? defaultDisplay} max-w-6xl m-auto my-5`}>
      {children}
    </section>
  );
}

export default Section;
