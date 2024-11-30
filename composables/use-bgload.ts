export default function () {
  const state = useState("backgroundLoad", () => false);
  return state;
}