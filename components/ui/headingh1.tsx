interface HeadingH1Props {
  title: string;
  desc: string;
}

export const HeadingH1: React.FC<HeadingH1Props> = ({ title, desc }) => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="text-xs lg:text-md text-muted-foreground">{desc}</p>
    </div>
  );
};
