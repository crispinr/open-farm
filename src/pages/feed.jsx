import Head from "next/head";
import BaseLayout from "@/components/BaseLayout";
import { League_Spartan } from "next/font/google";
import Modal from "react-modal";
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
    name: "LUXON",
    description:
      "Transporting service required to move harvested rice grains from Avadi to Central Market",

    handler: function (response) {
      alert(`Transaction ID: ${response.razorpay_payment_id}`);
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

export const getServerSideProps = async () => {
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
  return {
    props: { feed, profile },
  };
};

export default function Feed({ feed, profile }) {
  const router = useRouter();
  const session = useSession();

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  const [isOpen, setIsOpen] = useState(false);

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
          <div div className="row">
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
            {feed.map((item, i) => {
              console.log(item.imageSrc);
              return (
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
                    <MDBCardText>{item.title}</MDBCardText>
                    <Image
                      src={
                        item.imageSrc
                          ? item.imageSrc
                          : "https://www.eweek.com/wp-content/uploads/2022/05/enterprise-AI.jpg"
                      }
                      className="rounded-2 bg-dark"
                      width="688"
                      height="300"
                      alt="Profile Picture"
                    />
                    <div className="mt-2">
                      <MDBBtn>
                        <button onClick={() => setIsOpen(true)}>
                          More info
                        </button>
                        <Modal
                          isOpen={isOpen}
                          onRequestClose={() => setIsOpen(false)}
                        >
                          <h1> Modal Content</h1>
                          <button onClick={() => setIsOpen(false)}>
                            Close
                          </button>
                        </Modal>
                      </MDBBtn>
                      <MDBBtn
                        onClick={displayRazorpay}
                        className="bg-primary text-secondary px-2 py-1 rounded-pill text-capitalize"
                      >
                        Pay them!
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              );
            })}
          </div>
        </BaseLayout>
      </main>
    </>
  );
}
