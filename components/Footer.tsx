import { Button } from "./Button";

export const Footer = () => {
  return (
    <footer className={"fixed bottom-0 left-0"}>
      <div className={"flex flex-col"}>
        <Button
          label={"Click Me"}
          onClick={() => {
            console.log("clicked");
          }}
        />
        <Button
          label={"Click Me"}
          onClick={() => {
            console.log("clicked");
          }}
        />
      </div>
    </footer>
  );
};
