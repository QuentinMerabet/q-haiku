import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <aside>
        <div className="logo">
          <Image width={30} height={30} src="logo.svg" />
          <span>俳句</span>
        </div>
      </aside>
      <section>
        <div className="intro">
          <h4>Featuring the magic of AI</h4>
          <h1>Haiku, inspired by you.</h1>
        </div>
        <div className="haiku-card">
          <p>
            Golden sun sets low,
            <br />
            Boomer curses Photoshop,
            <br />
            Bitcoin shines bright.
          </p>
          <div className="tags">
            <div className="tag">Leaves</div>
            <div className="tag">Popcorn</div>
            <div className="tag">Flowers</div>
            <div className="tag">Boomer</div>
            <div className="tag">Sandcastle</div>
          </div>
        </div>
        <form>
          <label>Drop a word to inspire the next Haiku.</label>
          <input type="text" />
          <button>Submit</button>
        </form>
      </section>
    </main>
  );
}
