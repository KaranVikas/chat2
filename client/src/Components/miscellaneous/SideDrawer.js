import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import Profile from "./Profile";
import ProfileModal from "./ProfileModal";
import UserListItem from "../UserAvatar/UserListItem";
import axios from "axios";
import { getSender } from "../../config/ChatLogics";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow((show) => !show);
    console.log("clicked on show");
  };

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
    setUser,
  } = ChatState();

  console.log("USER in side drawer", user);

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    console.log("userinfo deleted");
    history.push("/");
    setUser(null);
  };

  const handleSearch = async () => {
    console.log(search);
    if (!search) {
      // toast function to throw error
      const notify = () => {
        toast.warn("Please Enter something ");
      };
      notify();

      console.log("please Enter something ");
    }

    try {
      //setLoading(true)
      console.log(loading);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      console.log({ loading });
      setSearchResult(data);
      console.log({ data });
    } catch (error) {
      // toast function -> Failed to load the search results
      console.log("Failed to load the Search Results");
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);
      // if chat is already in chat state
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      // close modal
    } catch (error) {
      // toast function
      console.log("Error fetching the chat");
    }
  };
  return (
    <>
      <div
        className="d-flex container-fluid  align-items-center justify-content-between"
        style={{
          border: "",
          boxShadow: "rgb(0 0 0 / 8%) 0px 4px 20px",
          backgroundColor: "rgb(255, 240, 55)",
        }}
      >
        <div className=" d-flex col-1 col-lg-4 justify-content-between pe-lg-3">
          <svg
            style={{}}
            width="40"
            height="40"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.02044 3.05322C4.09066 1.983 5.82982 1.78229 7.10075 2.51811L6.43188 1.71541C5.29471 0.31072 2.95356 0.444479 1.68263 1.71541C0.411704 2.98634 0.277944 5.32749 1.68263 6.46466L2.48533 7.13353C1.74951 5.8626 1.95022 4.12344 3.02044 3.05322Z"
              fill="white"
            />
            <path
              d="M19.141 35.9633C18.9404 35.9633 18.8066 35.8964 18.6728 35.7626L16.7999 33.8897C16.733 33.8228 16.6661 33.7559 16.6661 33.6221C14.5925 27.2675 13.7899 25.1939 12.452 23.1204C10.9136 20.7792 10.3115 17.6354 11.0474 15.2273C11.8501 12.5517 13.8567 10.9464 16.9337 10.7457C19.1411 10.6119 21.4154 11.2808 23.5559 12.6855C25.4957 14.0233 28.0375 14.826 33.6563 16.632C33.79 16.632 33.8569 16.6989 33.9239 16.7658L35.7968 18.6387C35.9974 18.8393 36.0644 19.1738 35.9306 19.4414C35.7299 19.8427 30.4456 29.2074 19.6093 35.7626C19.4085 35.8964 19.2748 35.9633 19.141 35.9633ZM17.8701 33.0201L19.2748 34.4247C28.2381 28.8729 33.2549 21.1805 34.392 19.3076L32.9873 17.9029C27.3685 16.0968 24.7598 15.2273 22.6862 13.8226C20.8801 12.5516 18.8734 11.9496 16.9336 12.1503C14.4587 12.3509 12.9201 13.4881 12.2513 15.6955C11.6493 17.6353 12.1844 20.4447 13.5222 22.4514C14.9269 24.525 15.7965 26.6655 17.8701 33.0201Z"
              fill="#472183"
            />
            <path
              d="M11.7833 15.6955C11.6496 15.6955 11.4489 15.6286 11.382 15.5617L1.2147 6.93281C0.478882 6.33082 0.0775324 5.39436 0.0106525 4.39102C-0.0562274 3.18697 0.412002 2.04987 1.2147 1.24717C2.0174 0.444473 3.1545 -0.0237567 4.35855 0.0431232C5.36189 0.110003 6.29835 0.511353 6.90041 1.31405L15.4624 11.4145C15.5961 11.6151 15.663 11.8158 15.5961 12.0165C15.5293 12.2171 15.3955 12.4178 15.1948 12.4847C13.857 12.9529 12.9874 13.8894 12.4523 15.2941C12.3854 15.4947 12.1847 15.6285 11.9841 15.6954C11.9172 15.6955 11.8502 15.6955 11.7833 15.6955ZM4.15784 1.38093C3.42202 1.38093 2.68627 1.64852 2.15116 2.18363C1.61605 2.71874 1.28158 3.52144 1.34846 4.32414C1.34846 4.99301 1.61605 5.59507 2.08428 5.92954L11.5827 13.9564C12.1178 12.9531 12.9205 12.1504 13.9239 11.6152L5.897 2.11675C5.49565 1.7154 4.96054 1.44788 4.2916 1.38093C4.22479 1.38093 4.15784 1.38093 4.15784 1.38093Z"
              fill="#472183"
            />
            <path
              d="M16.7329 6.93283C16.4653 6.93283 16.1978 6.73219 16.0641 6.4646L14.6594 1.84919C14.5256 1.51472 14.7262 1.11337 15.1276 1.04649C15.4621 0.912726 15.8634 1.11337 15.9303 1.51472L17.335 6.06325C17.4687 6.39772 17.2681 6.79907 16.8668 6.86595C16.8668 6.93283 16.7998 6.93283 16.7329 6.93283Z"
              fill="#472183"
            />
            <path
              d="M24.4253 9.27401C24.2247 9.27401 24.0239 9.20713 23.8902 9.00642C23.6226 8.73883 23.6895 8.2706 23.9571 8.06996L27.7029 4.99299C27.9705 4.7254 28.4387 4.79235 28.6394 5.05987C28.9069 5.32746 28.84 5.79569 28.5725 5.99633L24.8266 9.0733C24.6929 9.20706 24.5591 9.27401 24.4253 9.27401Z"
              fill="#472183"
            />
            <path
              d="M20.5456 8.07C20.4788 8.07 20.4119 8.07 20.345 8.07C20.0105 7.93624 19.8099 7.60177 19.8768 7.2673L20.8132 4.05657C20.9469 3.7221 21.2814 3.52147 21.6159 3.58835C22.0841 3.65523 22.2847 4.05657 22.151 4.39104L21.2145 7.60177C21.0807 7.86936 20.8801 8.07 20.5456 8.07Z"
              fill="#472183"
            />
            <path
              d="M6.23109 29.4749C6.09733 29.4749 5.9635 29.4749 5.89662 29.408C5.56215 29.2074 5.49527 28.806 5.69598 28.4716L8.23784 24.3912C8.43848 24.0568 8.83983 23.9899 9.1743 24.1906C9.50877 24.3912 9.57565 24.7926 9.37494 25.1271L6.83308 29.2074C6.69932 29.3411 6.49868 29.4749 6.23109 29.4749Z"
              fill="#472183"
            />
            <path
              d="M5.42843 18.1035C5.36155 18.1035 5.36155 18.1035 5.29467 18.1035L0.545426 17.3677C0.210957 17.3008 -0.056563 16.9663 0.0103169 16.6319C0.0771968 16.2974 0.411667 16.0299 0.746137 16.0967L5.56226 16.7656C5.89673 16.8325 6.16425 17.167 6.09737 17.5014C6.03049 17.836 5.7629 18.1035 5.42843 18.1035Z"
              fill="#472183"
            />
            <path
              d="M4.09056 23.1203C3.82297 23.1203 3.62233 22.9865 3.48857 22.7189C3.35481 22.3845 3.48857 21.9831 3.82304 21.8493L6.83313 20.4447C7.1676 20.3109 7.56895 20.4447 7.70271 20.7791C7.83647 21.1136 7.70271 21.5149 7.36824 21.6487L4.35815 23.0534C4.29127 23.1203 4.15744 23.1203 4.09056 23.1203Z"
              fill="#472183"
            />
            <path
              d="M17.0674 24.1237C16.7998 24.1237 16.5991 23.9899 16.4654 23.7223C15.9972 22.7859 15.7965 22.5183 15.4621 22.2508C15.1276 21.9163 14.7262 21.5149 14.1242 20.4447V20.3778C13.9905 19.9765 12.7196 16.7658 13.9236 15.0266C14.1242 14.759 14.5925 14.6921 14.8601 14.8928C15.1277 15.0935 15.1945 15.5617 14.9938 15.8293C14.3918 16.632 14.8601 18.7056 15.3283 19.8427C15.8634 20.7792 16.131 21.0468 16.3985 21.3143C16.733 21.6488 17.1343 22.0501 17.6694 23.1872C17.8032 23.5217 17.6694 23.923 17.335 24.0568C17.268 24.1237 17.1343 24.1237 17.0674 24.1237Z"
              fill="#472183"
            />
            <path
              d="M28.1043 34.1572C26.432 34.1572 24.8267 33.4214 23.6895 32.2174L23.2213 31.6823L23.7564 31.2141C26.4989 29.0067 28.9738 26.5318 31.1812 23.7893L31.6494 23.2542L32.1845 23.7224C33.3885 24.8596 34.1243 26.4649 34.1243 28.1372C34.1244 31.4816 31.4488 34.1572 28.1043 34.1572ZM25.228 31.8161C26.0307 32.4849 27.034 32.8194 28.1043 32.8194C30.713 32.8194 32.7866 30.7458 32.7866 28.1371C32.7866 27.0669 32.4521 26.0635 31.7832 25.2609C29.7765 27.6019 27.5691 29.8093 25.228 31.8161Z"
              fill="#472183"
            />
          </svg>

          <h4 className="d-none d-lg-block" style={{ fontSize: "32px" }}>
            DingDong
          </h4>
        </div>

        <div className="d-flex col-10 col-lg-8 justify-content-between  align-items-center ms-2">
          <div className="d-flex justify-content-center">
            <i
              className="d-none d-sm-block fa-solid fa-bell p-1 pe-2"
              style={{ fontSize: "larger", alignSelf: "center" }}
            />
            <div className="d-none d-sm-block">
              {!notification.length && "No New Message"}
              {notification.map((notif) => (
                <div
                  className=""
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </div>
              ))}
            </div>
          </div>

          <div className="col-5">
            <button
              className="d-flex justify-content-between btn btn-light btn-block  m-1 w-100"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              Search
              <i className="fa-solid fa-search p-1 px-2 pe-3" />
            </button>

            <div
              className="offcanvas offcanvas-start d-flex justify-content-between"
              tabIndex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                  Search Users
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <hr />
              <div className="offcanvas-body">
                <div>
                  {/* <form className="d-flex" role="search"> */}
                  <div className="d-flex mb-3">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search by name or email"
                      aria-label="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-warning"
                      type="submit"
                      onClick={handleSearch}
                      onChange={(e) => e.preventDefault()}
                    >
                      Go
                    </button>
                  </div>
                  <ToastContainer />
                  {/* </form> */}
                  {/* if  loading show component else show results */}
                  {loading ? (
                    <ChatLoading />
                  ) : (
                    searchResult?.map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => accessChat(user._id)}
                      />
                    ))
                  )}
                  {/* {(searchResult?.map(user =>(
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={()=>accessChat(user._id)}/>
                )))} */}
                </div>
              </div>
            </div>
          </div>

          {/* <Profile /> */}

          <div className="d-flex dropdown">
            <Profile />
            <button
              className="btn btn-light dropdown-toggle d-flex align-items-center "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                border: "none",
                background: "transparent",
              }}
            >
              {/* <img
                src={user.pic}
                className="d-none d-sm-block rounded-circle m-1 me-3 ms-0"
                style={{ height: "50px", width: "50px" }}
                alt={user.name}
                loading="lazy"
              /> */}
              {user.name}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              style={{ backgroundColor: "#f8f9fa", minWidth: "8rem" }}
            >
              {/* <li className="mb-1">
                <ProfileModal user={user} show={show}>
                  <button
                    onClick={showModal}
                    type="button"
                    className="btn btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    My Profile 2
                  </button>
                </ProfileModal>
              </li> */}
              {/* <hr style={{ border: "1px solid black" }} /> */}
              <li className="d-flex justify-content-center"></li>
              <li className="d-flex justify-content-center">
                <button
                  onClick={logoutHandler}
                  type="button"
                  className="btn btn-light"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
