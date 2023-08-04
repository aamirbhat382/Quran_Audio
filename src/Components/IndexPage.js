import NavBar from "./NavBar";
const IndexPage = () => {
  return (
    <NavBar>
      <div className="container  py-5 px-5 ">
        <div className="row justify-content-center">
          <a href="/suraha" className="col-sm-4   py-3 bg-dark-black rounded my-2 mx-1  text-light text-center box-chamk">
            <h6 className="ul">Listen Surah Ayah By Ayah</h6>
            <i className="bi bi-music-note-beamed me-2"></i>
          </a>
          <a href="/surha-audio" className="col-sm-4  py-3 bg-dark-black rounded my-2  mx-1 text-light text-center box-chamk">
            <h6 className="ul">Listen Surah </h6>
           
            <i className="bi bi-music-note-list me-2"></i>
          </a>
          <a href="/suraha/tajweed" className="col-sm-4  py-3 bg-dark-black rounded my-2  mx-1  text-light text-center box-chamk">
            <h6 className="ul">Read Tajweed Quran</h6>
            <i className="bi bi-book me-2"></i>
          </a>
          <a href="/prayer" className="col-sm-4 py-3 bg-dark-black rounded my-2  mx-1  text-light text-center box-chamk">
            <h6 className="ul">Prayer Times</h6>
            <i className="bi bi-clock me-2"></i>
          </a>
          <a href="/clander" className="col-sm-4   py-3 bg-dark-black rounded my-2  mx-1  text-light text-center box-chamk">
            <h6 className="ul">Calendar </h6>
            <i className="bi bi-calendar-day me-2"></i>
          </a>
          <a href="/settings" className="col-sm-4   py-3 bg-dark-black rounded my-2  mx-1  text-light text-center box-chamk">
            <h6 className="ul">Settings </h6>
            <i className="bi bi-gear me-2"></i>
          </a>
          <a href="/downloadapp" className="col-sm-4   py-3 bg-dark-black rounded my-2  mx-1  text-light text-center box-chamk">
            <h6 className="ul">Download App</h6>
            <i className="bi bi-arrow-down-circle me-2"></i>
          </a>
          <a href="/developer" className="col-sm-4   py-3 bg-dark-black rounded my-2  mx-1  text-light text-center box-chamk">
            <h6 className="ul">Developer</h6>
            <i className="bi bi-file-code me-2"></i>
          </a>
        </div>
      </div>
    </NavBar>
  );
};
export default IndexPage;
