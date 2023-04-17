import Head from "next/head";
import BaseLayout from "@/components/BaseLayout";
import { MDBBtn } from "mdb-react-ui-kit";
import { BsGithub } from "react-icons/bs";

export default function Home() {
  return (
    <>
      <Head>
        <title>Open Farm | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <BaseLayout home>
          <section className="dot-pattern mt-n4 mb-n5">
            <div className="container vh-75 d-flex flex-column justify-content-center align-items-center">
              <h1 className="display-1 bold text-center text-primary">
                Connect, Collaborate and Invest.
              </h1>
              <h4 className="mt-3 mb-4">
                Unlock the potential of unused Ideas with our open contribution.
              </h4>
              <div>
                <MDBBtn
                  className="bg-secondary custom-shadow rounded-pill text-capitalize bg-btn"
                  href="/feed"
                >
                  Get Started!
                </MDBBtn>
                <MDBBtn
                  className="bg-secondary custom-shadow rounded-pill text-capitalize bg-btn ms-3"
                  href="/home"
                >
                  <BsGithub className="mb-1 me-2" />
                  Github
                </MDBBtn>
              </div>
            </div>
          </section>
        </BaseLayout>
      </main>
    </>
  );
}
