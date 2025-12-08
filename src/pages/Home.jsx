import React, { useState } from "react";
import Post from "../components/Post.jsx";

const Home = () => {
  const [post, setPosts] = useState([
    {
      id: 1,
      title:
        "[ไม่ยืนยัน] IBM ใกล้ปิดดีลซื้อกิจการ Confluent บริษัทเทคโนโลยี Data Streaming มูลค่า 1.1 หมื่นล้านดอลลาร์",
      cover:
        "https://www.blognone.com/sites/default/files/news-feature-image/2025/2025-12/b0bwy4k.jpg",
      author: " arjin",
      createAt: "8 December 2025  - 12:10 ",
      summary:
        "The Wall Street Journal อ้างแหล่งข่าวที่เกี่ยวข้องว่า IBM กำลังเจรจาในขั้นสุดท้ายเพื่อซื้อกิจการ Confluent บริษัทพัฒนาเทคโนโลยีสำหรับการสตรีมข้อมูล ด้วยมูลค่ากิจการประมาณ 1.1 หมื่นล้านดอลลาร์ คาดว่าดีลนี้จะประกาศเป็นทางการภายใน 1-2 วันข้างหน้า",
    },
    {
      id: 2,
      title:
        "X ปิดบัญชีโฆษณาของคณะกรรมาธิการแห่งสหภาพยุโรป หลังจากมีคำสั่งปรับเงิน 120 ล้านยูโร",
      cover: "https://www.blognone.com/sites/default/files/topics-images/x.png",
      author: " arjin",
      createAt: "8 December 2025  - 11:10 ",
      summary:
        "จากประเด็น X ถูก EU สั่งปรับเงิน 120 ล้านยูโร โดยระบุว่าทำผิดกฎหมายดิจิทัลเกี่ยวกับระบบยืนยันตัวตนเครื่องหมายติ๊กถูกสีฟ้า ล่าสุดมีการตอบโต้จากฝั่ง X แล้วNikita Bier หัวหน้าฝ่ายผลิตภัณฑ์ของ X เปิดเผยว่าบัญชีโฆษณาของคณะกรรมาธิการแห่งสหภาพยุโรป (European Commission - EC) ได้ล็อกอินเพื่อโพสต์ประกาศเรื่องการปรับเงิน X ผ่านระบบ Ad Composer ที่สามารถแทรกลิงก์ทำให้ผู้ใช้งานเข้าใจว่าผิดเป็นวิดีโอได้",
    },
  ]);
  return (
    <div className="space-y-4">
      {post.map((post, index) => (
        <Post
          postDetail={post}
          key={post.id}
          index={index}
          title={post.title}
          cover={post.cover}
          author={post.author}
          createAt={post.createAt}
          summary={post.summary}
        />
      ))}
    </div>
  );
};
export default Home;
