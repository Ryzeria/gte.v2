"use client";
import ArrowRight from "@/assets/arrow-right.svg";
import starImage from "@/assets/star.png";
import springImage from "@/assets/spring.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const footerMaps = [
    {
      title: "DEPARTEMEN TEKNIK GEOMATIKA ITS",
      address:
        "Gedung Teknik Geomatika, Kampus ITS, Keputih, Sukolilo, Keputih, Sukolilo, Surabaya 60111, Jawa Timur 60117, Indonesia",
      phone: "Phone : 031-5929486 / Fax : 031-5929487",
      email: "geomatika@its.ac.id",
      mapLink:
        "https://maps.google.com/maps?q=Departemen%20Teknik%20Geomatika%20ITS%20Sukolilo%20Surabaya&output=embed",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip"
    >
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">
            Unlock Accurate Tidal Measurements Today
          </h2>
          <p className="section-des mt-5">
            Experience the power of Geomarine Tidal Expert for precise tidal
            monitoring and analysis. Perfect for research and coastal
            management.
          </p>

          <motion.img
            src={starImage.src}
            alt="star image"
            width={360}
            className="absolute -left-[350px] -top-[137px]"
            style={{
              translateY,
            }}
          />
          <motion.img
            src={springImage.src}
            alt="spring image"
            width={360}
            className="absolute -right-[331px] -top-[19px]"
            style={{
              translateY,
            }}
          />
        </div>

        <div className="flex gap-2 mt-10 justify-center">
          <button className="btn btn-primary">Get Geomarine Tidal Expert</button>
          <button className="btn btn-text gap-1">
            <span>Learn More</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Contact and Product Inquiry Section */}
        <div className="flex flex-wrap md:flex-nowrap mt-16 gap-8">
          {/* Product Inquiry Form */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-4">Product Inquiry</h3>
            <form className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium">Company</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium">Country</label>
                  <select className="w-full border rounded-md p-2">
                    <option>United Kingdom</option>
                    <option>Indonesia</option>
                    <option>United States</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Enquiry</label>
                <textarea
                  className="w-full border rounded-md p-2"
                  rows={4}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Contact and Map */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p>{footerMaps[0].title}</p>
              <p>{footerMaps[0].address}</p>
              <p>{footerMaps[0].phone}</p>
              <p>Email: <a href={`mailto:${footerMaps[0].email}`}>{footerMaps[0].email}</a></p>
            </div>
            <iframe
              src={footerMaps[0].mapLink}
              className="w-full h-64 mt-4 border rounded-md"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
