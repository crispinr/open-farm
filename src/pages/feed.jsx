import Head from "next/head";
import BaseLayout from "@/components/BaseLayout";
import { League_Spartan } from "next/font/google";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBBadge,
  MDBModal,
} from "mdb-react-ui-kit";

import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSession } from "@supabase/auth-helpers-react";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/initSupabase";
import { useEffect } from "react";
import { checkUserLoggedIn } from "@/utils/auth";
import { useState } from "react";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

const displayRazorpay = async (amount) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("You re offline...");
    return;
  }

  const options = {
    key: "rzp_test_aLDxDSv5W707v9",
    currency: "INR",
    amount: 100000,
    name: "Alluvial Soil",
    description:
      "Transporting service required to move harvested rice grains from Avadi to Central Market",

    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert("Payment Successful");
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

const ls_bold = League_Spartan({
  weight: "700",
  subsets: ["latin"],
});

export const getStaticProps = async () => {
  const feedData = await prisma.posts.findMany({
    include: {
      profiles: true,
    },
  });

  const feed = JSON.parse(JSON.stringify(feedData));
  const { data } = await checkUserLoggedIn();

  const profile = await prisma.profiles.findFirst({
    where: {
      id: "54edc236-6745-4d33-aadd-9d2cfcb418d7",
    },
  });
  console.log("profile", profile);
  return {
    props: { feed, profile },
  };
};

export default function Feed({ feed, profile }) {
  const router = useRouter();
  const session = useSession();

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
      <Head>
        <title>Open Farm | Feed</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <BaseLayout>
          <div className="row">
            <div className="col-md-3">
              <MDBCard className="bg-secondary text-center sticky-top">
                <MDBRipple
                  rippleColor="light"
                  rippleTag="div"
                  className="bg-image hover-overlay"
                  style={{ zIndex: 0 }}
                >
                  <MDBCardImage
                    src="https://i.pinimg.com/originals/31/bd/48/31bd488d3359a551bd802cef8fafe9ee.jpg"
                    fluid
                    alt="..."
                    style={{ height: "180px" }}
                  />
                  <a>
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </a>
                </MDBRipple>
                <MDBCardBody>
                  <MDBCardTitle className="d-flex justify-content-between align-items-center">
                    <div className="fs-6">
                      123
                      <br />
                      followers
                    </div>
                    <div style={{ zIndex: 1 }}>
                      <Image
                        src="https://api.dicebear.com/6.x/avataaars/svg?radius=50"
                        className="rounded-circle rounded-pill p-1 mt-n5 bg-dark custom-border"
                        width="100"
                        height="100"
                        alt="Profile Picture"
                        priority
                      />
                    </div>
                    <p className="fs-6">
                      967
                      <br />
                      following
                    </p>
                  </MDBCardTitle>
                  <div>
                    <h2 className="mb-0">{profile.full_name}</h2>
                    <h6 className="text-muted">@{profile.username}</h6>
                    Hello World, I am a web developer and designer. I love to
                    code and design beautiful websites.
                  </div>
                  <hr className="text-muted" />
                  <MDBBtn
                    href="/profile"
                    className="bg-secondary custom-shadow rounded-pill text-capitalize bg-btn"
                  >
                    My Profile
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </div>

            <div className="col-md-6">
              <div className="d-flex justify-content-start align-items-center mb-2">
                {[1, 2, 3, 4, 5, 6].map((item, i) => (
                  <div key={i} className="h1 text-center me-3">
                    <MDBBadge className="bg-secondary rounded-circle p-2" light>
                      <Image
                        src="https://api.dicebear.com/6.x/personas/svg?radius=50"
                        className="rounded-circle bg-dark custom-border"
                        width="50"
                        height="50"
                        alt="Profile Picture"
                        priority
                      />
                    </MDBBadge>
                    <h6 className="fs-6">John</h6>
                  </div>
                ))}
                <div className="h1 text-center mb-4">
                  <MDBBadge className="bg-secondary rounded-circle p-1" light>
                    <AiOutlinePlusCircle size="28" className="text-muted" />
                  </MDBBadge>
                </div>
              </div>
              <div className="bg-secondary rounded-5 p-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Create Post</h5>
                  <MDBBtn
                    href="#"
                    className="bg-primary h5 mb-0 text-secondary px-2 py-1 rounded-pill text-capitalize"
                  >
                    Post!
                  </MDBBtn>
                </div>
                <div className="d-flex justify-content-start align-items-start">
                  <Image
                    src="https://api.dicebear.com/6.x/personas/svg?radius=50"
                    className="rounded-circle bg-dark custom-border me-3"
                    width="50"
                    height="50"
                    alt="Profile Picture"
                    priority
                  />
                  <textarea
                    className="form-control bg-secondary text-white border-1 border-dark border-secondary"
                    placeholder="What's on your mind?"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              {feed.map((item, i) => (
                <MDBCard className="bg-secondary my-4" key={i}>
                  <MDBCardBody>
                    <MDBCardTitle>
                      <div className="d-flex justify-content-start align-items-start">
                        <MDBRipple
                          rippleColor="light"
                          rippleTag="div"
                          className="bg-image hover-overlay"
                        >
                          <Image
                            src="https://api.dicebear.com/6.x/personas/svg?radius=50"
                            className="rounded-circle bg-dark custom-border me-3"
                            width="50"
                            height="50"
                            alt="Profile Picture"
                            priority
                          />
                        </MDBRipple>
                        <span>
                          <h6 className="fs-6 text-muted">
                            @{item.profiles.username}
                          </h6>
                          <p className="fs-6 text-primary">
                            {item.profiles.full_name}
                            <span className="text-muted text-capitalize">
                              {" "}
                              • {new Date(item.updated_at).toLocaleTimeString()}
                            </span>
                          </p>
                        </span>
                      </div>
                    </MDBCardTitle>
                    <MDBCardText>{item.description}</MDBCardText>
                    <Image
                      src="https://www.ultraupdates.com/wp-content/uploads/2016/09/colorful-twitter-header.jpg"
                      className="rounded-2 bg-dark"
                      width="688"
                      height="300"
                      alt="Profile Picture"
                      priority
                    />
                    <div className="mt-2">
                      <span class="badge badge-primary">{item.area}</span>
                      <span class="badge badge-secondary mx-3">
                        {item.soil_type}
                      </span>
                      <span class="badge badge-success">{item.location}</span>
                    </div>
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <div>
                        <MDBBtn
                          href="#"
                          className="bg-transparent shadow-0 rounded-circle text-capitalize p-2 me-2 text-muted"
                        >
                          <AiOutlineHeart size="23" />
                        </MDBBtn>
                        <MDBBtn
                          href="#"
                          className="bg-transparent shadow-0 rounded-circle text-capitalize p-2 me-2 text-muted"
                        >
                          <FaRegCommentDots size="23" />
                        </MDBBtn>
                        <MDBBtn
                          href="#"
                          className="bg-transparent shadow-0 rounded-circle text-capitalize p-2 me-2 text-muted"
                        >
                          <FiSend size="21" />
                        </MDBBtn>
                      </div>
                      <div>
                        <MDBBtn
                          href="#"
                          className="bg-primary text-secondary px-2 py-1 shadow-0 rounded-5 text-capitalize"
                        >
                          Hire me!
                        </MDBBtn>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              ))}
            </div>
            <div className="col-md-3">
              <div className="bg-secondary rounded-5 p-3 sticky-top">
                <h5>Recent activity</h5>
                <div className="custom-out-bg p-3 my-3 rounded-5">
                  <div className="d-flex justify-content-start align-items-start">
                    <Image
                      src="https://api.dicebear.com/6.x/personas/svg?radius=50"
                      className="rounded-circle bg-dark custom-border me-3"
                      width="50"
                      height="50"
                      alt="Profile Picture"
                      priority
                    />
                    <span>
                      <h6 className="fs-6 mb-0">John</h6>
                      <p className="fs-6 text-primary">
                        Income Received!
                        <span className="text-muted"> • 3mins ago</span>
                      </p>
                    </span>
                  </div>
                  <div className="custom-in-bg p-2 px-3 rounded-5 d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Rs. 500 /-</h6>
                    <MDBBtn
                      onClick={displayRazorpay}
                      className="bg-primary text-secondary px-2 py-1 rounded-pill text-capitalize"
                    >
                      Say thanks!
                    </MDBBtn>
                  </div>
                </div>
                <div className="custom-out-bg p-3 my-3 rounded-5">
                  <div className="d-flex justify-content-start align-items-start">
                    <Image
                      src="https://api.dicebear.com/6.x/personas/svg?radius=50"
                      className="rounded-circle bg-dark custom-border me-3"
                      width="50"
                      height="50"
                      alt="Profile Picture"
                      priority
                    />
                    <span>
                      <h6 className="fs-6 mb-0">Sam</h6>
                      <p className="fs-6 text-primary">
                        Deadline Arrived!
                        <span className="text-muted"> • 10mins ago</span>
                      </p>
                    </span>
                  </div>
                  <div className="custom-in-bg p-2 px-3 rounded-5 d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Rs. 800 /-</h6>
                    <MDBBtn
                      href="#"
                      className="bg-primary text-secondary px-2 py-1 rounded-pill text-capitalize"
                    >
                      Pay them!
                    </MDBBtn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BaseLayout>
      </main>
    </>
  );
}
