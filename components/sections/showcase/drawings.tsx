import { vars } from "./scene-kit";

/**
 * Small drawings used inside the showcase planes. Pure markup; the look lives in styles/showcase.css
 * (`.v-*`). Each one sizes itself from its plane's width, so the same drawing works as a small card
 * in a flow or as a large centrepiece.
 */
export type DrawingId =
  | "browser"
  | "devices"
  | "code"
  | "stack"
  | "deploy"
  | "audience"
  | "target"
  | "creative"
  | "landing"
  | "search"
  | "ad"
  | "input"
  | "ai"
  | "flow"
  | "result"
  | "checklist"
  | "sheets"
  | "loop"
  | "data"
  | "model"
  | "classify"
  | "segment"
  | "explain"
  | "photo"
  | "video"
  | "canva"
  | "word"
  | "excel"
  | "workspace";

const four = (
  <>
    <i />
    <i />
    <i />
    <i />
  </>
);

export function Drawing({ id }: { id: DrawingId }) {
  switch (id) {
    case "browser":
      return <span className="v-browser" />;
    case "devices":
      return (
        <span className="v-devices">
          <i />
          <i />
          <i />
        </span>
      );
    case "code":
      return <span className="v-code">{"</>"}</span>;
    case "stack":
      return (
        <span className="v-stack">
          <i />
          <i />
          <i />
        </span>
      );
    case "deploy":
      return <span className="v-deploy" />;
    case "audience":
      return <span className="v-audience" />;
    case "target":
      return <span className="v-target" />;
    case "creative":
      return (
        <span className="v-canva v-creative">
          <i />
          <i />
          <i />
          <i />
        </span>
      );
    case "landing":
      return <span className="v-browser v-landing" />;
    case "search":
      return <span className="v-search" />;
    case "ad":
      return (
        <span className="v-ad">
          <b>Ad</b>
          <i />
          <i />
          <i />
        </span>
      );
    case "input":
      return (
        <span className="v-word v-input">
          <i style={vars({ "--w": 100 })} />
          <i style={vars({ "--w": 76 })} />
          <i style={vars({ "--w": 90 })} />
          <i style={vars({ "--w": 52 })} />
        </span>
      );
    case "ai":
      return <span className="v-model">{four}</span>;
    case "flow":
      return (
        <span className="v-flow">
          <i />
          <i />
          <i />
        </span>
      );
    case "result":
      return <span className="v-result" />;
    case "checklist":
      return (
        <span className="v-checklist">
          <i />
          <i />
          <i />
        </span>
      );
    case "sheets":
      return (
        <span className="v-excel v-sheets">
          <b>A</b>
          <b>B</b>
          <b>C</b>
          {Array.from({ length: 9 }, (_, cell) => (
            <i key={cell} style={vars({ "--c": cell })} />
          ))}
        </span>
      );
    case "loop":
      return <span className="v-loop" />;
    case "data":
      return <span className="v-data">{four}</span>;
    case "model":
      return <span className="v-model">{four}</span>;
    case "classify":
      return <span className="v-classify">{four}</span>;
    case "segment":
      return <span className="v-segment">{four}</span>;
    case "explain":
      return <span className="v-explain">{four}</span>;
    case "photo":
      return <span className="v-photo" />;
    case "video":
      return (
        <span className="v-video">
          <b>00:00</b>
          <b>00:30</b>
          <i style={vars({ "--w": 82, "--o": 0 })} />
          <i style={vars({ "--w": 58, "--o": 18 })} />
          <i style={vars({ "--w": 70, "--o": 8 })} />
          <u />
        </span>
      );
    case "canva":
      return (
        <span className="v-canva">
          <i />
          <i />
          <i />
          <i />
        </span>
      );
    case "word":
      return (
        <span className="v-word">
          <b />
          <i style={vars({ "--w": 100 })} />
          <i style={vars({ "--w": 82 })} />
          <i style={vars({ "--w": 94 })} />
          <i style={vars({ "--w": 58 })} />
        </span>
      );
    case "excel":
      return (
        <span className="v-excel">
          <b>A</b>
          <b>B</b>
          <b>C</b>
          {Array.from({ length: 9 }, (_, cell) => (
            <i key={cell} style={vars({ "--c": cell })} />
          ))}
        </span>
      );
    case "workspace":
      return (
        <span className="v-workspace">
          <i />
          <i />
          <i />
        </span>
      );
  }
}
