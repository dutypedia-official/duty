import React from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import SubHeader from "../../components/SubHeader";
import useLang from "../../Hooks/UseLang";

export default function SupportDescription({ navigation, route }) {
  const title = route?.params?.title;
  const inset = useSafeAreaInsets();
  const index = route?.params?.index;
  const { language } = useLang();
  const isBn = language == "Bn";
  return (
    <View
      style={{
        flex: 1,
        paddingTop: inset?.top,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 20,
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <SvgXml xml={backIcon} />
        </Pressable>
        <Text
          style={{
            fontSize: 16,

            color: "#0B0B0B",
            fontWeight: "500",
            marginLeft: 10,
            flex: 1,
          }}
        >
          {title}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {index == 1 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 32,
            }}
          >
            <Text style={styles.text}>
              {isBn
                ? `অর্ডার বাতিল করা আমাদের প্ল্যাটফর্মের একটি গুরুত্বপূর্ণ দিক এবং আমরা উভয়ই নিশ্চিত করতে চাই যে ক্রেতা এবং বিক্রেতারা প্রক্রিয়াটি বোঝেন৷`
                : `Order cancellation is an important aspect of our platform, and we want to make sure that both buyers and sellers understand the process.`}
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              {isBn
                ? `যদি একজন ক্রেতা অর্ডারের অনুরোধ পাঠায় বা একজন বিক্রেতা একজন ক্রেতার জন্য অর্ডার তৈরি করে, তাহলে উভয় পক্ষই বাতিল বোতাম ব্যবহার করে অর্থপ্রদানের আগে তাদের পক্ষ থেকে অর্ডারটি বাতিল করতে পারে৷ যাইহোক, একবার পেমেন্ট করা হয়ে গেলে, ক্রেতা আমাদের সহায়তা কেন্দ্রে যোগাযোগ না করে অর্ডারটি বাতিল করতে পারবেন না৷ ক্রেতা যদি অর্ডারটি বাতিল করতে চায়, তাহলে তাদের অবশ্যই বিক্রেতার সাথে আলোচনা করতে হবে এবং পারস্পরিক চুক্তিতে আসতে হবে৷`
                : `If a buyer sends an order request or a seller creates an order for a buyer, both parties can cancel the order from their side before payment by using the cancel button. However, once payment has been made, the buyer cannot cancel the order without contacting our support center. If the buyer wishes to cancel the order, they must first discuss it with the seller to try and come to a mutual agreement.`}
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              {isBn
                ? `বিক্রেতাদের যেকোনো সময় অর্ডার বাতিল করার ক্ষমতা রয়েছে৷ যাইহোক, যদি কোনও বিক্রেতা বৈধ কারণ ছাড়াই বারবার অর্ডার বাতিল করে, তাহলে এই ধরনের ক্ষেত্রে অ্যাকাউন্ট-সম্পর্কিত সমস্যা হতে পারে, তাদের অ্যাকাউন্ট সাময়িক বা স্থায়ীভাবে বন্ধ করার অধিকার সংরক্ষণ করে৷ এটা মনে রাখা গুরুত্বপূর্ণ যে বাতিলকরণ ক্রেতার অভিজ্ঞতাকে প্রভাবিত করে এবং বিক্রেতার সুনামকে ক্ষতিগ্রস্ত করতে পারে৷ অতএব, আমরা বিক্রেতাদের তাদের বাধ্যবাধকতা পূরণ করতে এবং শুধুমাত্র ব্যতিক্রমী পরিস্থিতিতে অর্ডার বাতিল করতে উৎসাহিত করি, যদি একজন বিক্রেতাকে একটি অর্ডার বাতিল করতে হয়, আমরা তাদের ক্রেতার সাথে স্পষ্টভাবে যোগাযোগ করতে এবং বাতিলের জন্য একটি বৈধ ব্যাখ্যা প্রদান করার পরামর্শ দিই৷`
                : `Sellers have the ability to cancel an order at any time. However, if a seller cancels orders repeatedly without a valid reason, it may result in account-related issues. In such cases, we reserve the right to temporarily or permanently terminate their account. It is important to note that cancellations impact the buyer's experience and can damage the seller's reputation. Therefore, we encourage sellers to fulfill their obligations and only cancel orders in exceptional circumstances. If a seller must cancel an order, we advise them to communicate clearly with the buyer and provide a valid explanation for the cancellation.`}
            </Text>
            {isBn ? (
              <Text style={[styles.text, { marginTop: 20 }]}>
                আমরা বিশ্বাস করি যে উভয় পক্ষের জন্য স্পষ্ট যোগাযোগ একটি মসৃণ
                লেনদেন এবং একটি ইতিবাচক অভিজ্ঞতা নিশ্চিত করতে পারে৷ অতএব, আমরা
                ক্রেতা এবং বিক্রেতাদের যে কোনও সমস্যা নিয়ে আলোচনা করতে উৎসাহিত
                করি এবং অর্ডার বাতিল করার আগে একটি সমাধান খোঁজার দিকে কাজ করতে
                পরামর্শ দিই৷
              </Text>
            ) : (
              <Text style={[styles.text, { marginTop: 20 }]}>
                We believe that clear communication is key in ensuring a smooth
                transaction and a positive experience for both parties.
                Therefore, we encourage buyers and sellers to discuss any issues
                that may arise and work towards finding a solution before
                canceling the order.
              </Text>
            )}
          </View>
        )}
        {index == 2 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 32,
            }}
          >
            {isBn ? (
              <Text style={styles.text}>
                একটি নিরাপদ এবং নির্ভরযোগ্য লেনদেন প্রক্রিয়া নিশ্চিত করতে,
                আমাদের প্ল্যাটফর্মে বিক্রেতাদের অনলাইন সার্ভিস, যেমন রসিদ, ফাইল,
                পাঠ বা পরামর্শ প্রদানের সময় যথাযথ ডেলিভারি প্রমাণ সরবরাহ করতে
                হবে৷ বিক্রেতাদের অবশ্যই যথাযথ ব্যবস্থা নিতে হবে, যেমন স্ক্রিনশট
                নেওয়া বা ১০-২০ সেকেন্ডের ভিডিও রেকর্ড করা, প্রমাণ করতে যে
                সার্ভিসটি সরবরাহ করা হয়েছে৷ জাল নথি বা প্রমাণ সরবরাহ করা
                কঠোরভাবে নিষিদ্ধ এবং এর ফলে বিক্রেতার অ্যাকাউন্টটি আর কোনো
                আলোচনা ছাড়াই বন্ধ হয়ে যাবে৷
              </Text>
            ) : (
              <Text style={styles.text}>
                To ensure a secure and reliable transaction process, our
                platform requires sellers to provide proper delivery proof when
                delivering online services, such as receipts, files, lessons, or
                consultations. Sellers must take appropriate measures, such as
                taking screenshots or recording 10-20 second videos, to prove
                that the service has been delivered. Providing fake documents or
                proof is strictly prohibited and will result in the termination
                of the seller's account without any further discussion.
              </Text>
            )}
            {isBn ? (
              <Text style={[styles.text, { marginTop: 20 }]}>
                যদি একজন বিক্রেতা ক্রেতার কাছে সমস্ত ফাইল সরবরাহ করে তবে ক্রেতা
                রিপোর্ট করে যে তারা সার্ভিস পায়নি, আমরা বিষয়টি তদন্ত করব এবং
                উভয় পক্ষের কাছ থেকে অনুসন্ধান করব৷ উভয় পক্ষকে সহযোগিতা করতে
                হবে আমাদের সাথে এবং আমাদের সিদ্ধান্তের সাথে একমত হতে হবে৷ এতে
                যদি উভয় পক্ষই আমাদের সিদ্ধান্তের সঙ্গে একমত না থাকে তাহলে তাদের
                আমাদের প্ল্যাটফর্মে অর্ডার দেওয়ার অনুমতি দেবেন না৷
              </Text>
            ) : (
              <Text style={[styles.text, { marginTop: 20 }]}>
                In case a seller delivers all files to the buyer, but the buyer
                reports that they did not receive the service, we will
                investigate the matter and inquire from both parties. Both
                parties must cooperate with us and agree with our decision. If
                both parties do not agree with our decision, the platform will
                not allow them to place orders on our platform.
              </Text>
            )}
            {isBn ? (
              <Text style={[styles.text, { marginTop: 20 }]}>
                আমরা সমস্ত ব্যবহারকারীর জন্য একটি মসৃণ এবং স্বচ্ছ প্রক্রিয়া
                নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ, এবং আমরা ক্রেতা এবং বিক্রেতা উভয়
                সুরক্ষিত হয় তা নিশ্চিত করার জন্য ডেলিভারি প্রমাণ গুরুত্ব সহকারে
                গ্রহণ করি৷
              </Text>
            ) : (
              <Text style={[styles.text, { marginTop: 20 }]}>
                We are committed to ensuring a smooth and transparent process
                for all users, and we take delivery proof seriously to ensure
                that both buyers and sellers are protected.
              </Text>
            )}
          </View>
        )}
        {index == 3 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 32,
            }}
          >
            {isBn ? (
              <Text style={styles.text}>
                ডিউটিতে, আমরা আমাদের গ্রাহকদের অর্ডার এবং লেনদেনের নিরাপত্তা এবং
                সুরক্ষাকে সর্বোপরি অগ্রাধিকার দিই এবং আমরা এই দায়িত্বটি অত্যন্ত
                গুরুত্ব সহকারে নিই৷। এইভাবে, আমরা সমস্ত বিক্রেতাদের জন্য একটি
                কঠোর প্রয়োজনীয়তা প্রয়োগ করেছি যাতে তারা অফার করে এমন সমস্ত
                সার্ভিসের জন্য যথাযথ ডেলিভারি প্রমাণ প্রদান করে, সেগুলি শারীরিক
                বা ডিজিটাল হোক না কেন৷
              </Text>
            ) : (
              <Text style={styles.text}>
                At Duty, we prioritize the security and protection of our
                customers' orders and transactions above all else, and we take
                this responsibility very seriously. As such, we have implemented
                a strict requirement for all sellers to provide proper delivery
                proof for all services they offer, whether they are physical or
                digital.
              </Text>
            )}
            {isBn ? (
              <Text style={[styles.text, { marginTop: 20 }]}>
                টিউশন, পাঠ, পরামর্শ, বাসা বা অফিস রক্ষণাবেক্ষণ বা অন্য কোনো
                শারীরিক বিতরণ কার্যক্রমের মতো শারীরিক সার্ভিসের জন্য,
                বিক্রেতাদের অবশ্যই ডেলিভারির প্রমাণ পেতে হবে৷ এটি বিক্রেতাকে
                ক্রেতার সামনে "হ্যাঁ, আমি ডেলিভারি করেছি" বোতামে ক্লিক করার
                পাশাপাশি ক্রেতাকে হ্যাঁ, আমি পেয়েছি" বোতামে ক্লিক করে
                সন্তোষজনকভাবে সার্ভিসটি পেয়েছেন তা নিশ্চিত করার জন্য অনুরোধ
                করতে হবে ৷ অতিরিক্তভাবে, বিক্রেতাকে অবশ্যই ডেলিভারি প্রুফ
                ডকুমেন্ট আপলোড করতে হবে যখন তারা "হ্যাঁ, আমি প্রদান করেছি"
                বোতামে ক্লিক করবে৷
              </Text>
            ) : (
              <Text style={[styles.text, { marginTop: 20 }]}>
                For physical services such as tuition, lessons, consultation,
                home or office maintenance, or any other physical delivery
                activities, sellers must obtain proof of delivery. This entails
                the seller clicking on the "yes, I delivered" button in front of
                the buyer, as well as requesting the buyer to confirm that they
                have received the service satisfactorily by clicking on the
                "yes, I received" button. Additionally, the seller must upload
                delivery proof documents when they click the "yes, I delivered"
                button.
              </Text>
            )}
            {isBn ? (
              <Text style={[styles.text, { marginTop: 20 }]}>
                যদি কোনও বিক্রেতা কোনও কর্মচারী বা শ্রমিককে সার্ভিসটি সরবরাহ
                করার জন্য ব্যবহার করে, তবে তাদের অবশ্যই ক্রেতার সামনে "হ্যাঁ,
                আমি প্রদান করেছি" বোতামে ক্লিক করতে হবে এবং কর্মচারী বা শ্রমিককে
                অবশ্যই ক্রেতাকে 'হ্যাঁ, আমি পেয়েছি'-বোতামে ক্লিক করতে অনুরোধ
                করতে হবে সার্ভিসটি সন্তোষজনকভাবে সরবরাহ করা হয়েছে তা নিশ্চিত
                করার জন্য৷ একইভাবে, যখন বিক্রেতা "হ্যাঁ, আমি প্রদান করেছি"
                বোতামে ক্লিক করেন, তখন তাদের অবশ্যই ডেলিভারি প্রমাণ ডকুমেন্টেশন
                প্রদান করতে হবে৷
              </Text>
            ) : (
              <Text style={[styles.text, { marginTop: 20 }]}>
                If a seller utilizes an employee or labor to deliver the
                service, they must click on the "yes, I delivered" button in
                front of the buyer, and the employee or labor must request the
                buyer to click on the "yes, I received" button to confirm that
                the service has been delivered satisfactorily. Similarly, when
                the seller clicks the "yes, I delivered" button, they must also
                provide delivery proof documentation.
              </Text>
            )}
            {isBn ? (
              <Text style={[styles.text, { marginTop: 20 }]}>
                শারীরিক সার্ভিসের জন্য, ডিউটিতে, আমরা পণ্য বা সার্ভিসগুলির
                বিতরণের জন্য কোনও তৃতীয় পক্ষের ডেলিভারি সার্ভিসটিগুলির ব্যবহার
                কঠোরভাবে নিষিদ্ধ করি, যেমন কুরিয়ার সার্ভিস , ক্রেতা এবং
                বিক্রেতার মধ্যে সমস্ত লেনদেন অবশ্যই ব্যক্তিগতভাবে, মুখোমুখি হতে
                হবে, আমাদের ব্যবহারকারীদের নিরাপত্তা নিশ্চিত করতে৷ অধিকন্তু,
                একটি নিরাপদ এবং নির্ভরযোগ্য অর্থপ্রদানের প্রক্রিয়া প্রদান করতে,
                সমস্ত অর্থ প্রদান করতে হবে ডিউটি ​​প্ল্যাটফর্মের মাধ্যমে৷ এটি
                একটি ক্রেতা বা বিক্রেতা কোনো তৃতীয় পক্ষের ডেলিভারি সার্ভিস
                ব্যবহার করে এবং পণ্য বা সার্ভিস সম্পর্কিত কোনো সমস্যা অনুভব করে,
                ডিউটিকে ​​কোনো ক্ষতির জন্য দায়ী করা যাবে না৷
              </Text>
            ) : (
              <Text style={[styles.text, { marginTop: 20 }]}>
                At Duty, we strictly prohibit the use of any third-party
                delivery services, such as couriers, for the delivery of
                services or products. All transactions between buyers and
                sellers must be conducted face-to-face to ensure the safety and
                security of our users. If a buyer or seller uses any such
                third-party services and experiences any issues related to the
                product or service, Duty cannot be held responsible for any
                damages or losses.
              </Text>
            )}
            {isBn ? (
              <Text style={[styles.text, { marginTop: 20 }]}>
                এই ধরনের ক্ষেত্রে, ডিউটি বিক্রেতার অ্যাকাউন্টের সমাপ্তি এবং কোনও
                আলোচনা ছাড়াই ক্রেতাকে সম্পূর্ণ অর্থ ফেরত দেওয়া সহ​​যথাযথ
                ব্যবস্থা নেওয়ার অধিকার সংরক্ষণ করে৷। আমরা আমাদের ব্যবহারকারীদের
                নিরাপত্তাকে অত্যন্ত গুরুত্ব সহকারে গ্রহণ করি এবং আমাদের
                শর্তাবলীর যেকোন লঙ্ঘনের প্রতি শূন্য-সহনশীলতা নীতি বজায় রাখি
              </Text>
            ) : (
              <Text style={[styles.text, { marginTop: 20 }]}>
                In such cases, Duty reserves the right to take appropriate
                action, including the termination of the seller's account and
                the refunding of the full amount to the buyer without any
                discussion. We take the safety and security of our users very
                seriously and maintain a zero-tolerance policy towards any
                violation of our terms.
              </Text>
            )}
            {isBn ? (
              <Text style={[styles.text, { marginTop: 20 }]}>
                এই নীতিটি আমাদের গ্রাহকদের অর্ডার এবং লেনদেনের নিরাপত্তা এবং
                সুরক্ষা নিশ্চিত করার জন্য প্রতিষ্ঠিত হয়েছে৷ আমরা দৃঢ়ভাবে
                বিশ্বাস করি যে সঠিক ডেলিভারি প্রমাণ সরবরাহ করা দক্ষ এবং
                নির্ভরযোগ্য সার্ভিসের জন্য এবং ক্রেতাদের সাথে আস্থা স্থাপনের
                জন্য অপরিহার্য৷ অতএব, আমরা আদেশ দিই যে বিক্রেতারা ডেলিভারির মূল
                প্রাপ্ত করে এবং ক্রেতাকে 'হ্যাঁ, আমি পেয়েছি' বোতামে ক্লিক করে
                রসিদ নিশ্চিত করার জন্য অনুরোধ করি৷ উপরন্তু, হ্যাঁ, আমি প্রদান
                করা বোতামে ক্লিক করার সময় বিক্রেতাদের অবশ্যই ডেলিভারি প্রমাণ
                ডকুমেন্টেশন আপলোড করতে হবে৷
              </Text>
            ) : (
              <Text style={[styles.text, { marginTop: 20 }]}>
                This policy is established to ensure the security and protection
                of our customers' orders and transactions. We firmly believe
                that providing proper delivery proof is essential for efficient
                and reliable service and to establish trust with buyers.
                Therefore, we mandate that sellers obtain proof of delivery and
                request the buyer to confirm receipt by clicking on the "yes, I
                received" button. Additionally, sellers must upload delivery
                proof documentation when clicking on the "yes, I delivered"
                button.
              </Text>
            )}
            {isBn ? (
              <Text style={[styles.text, { marginTop: 20 }]}>
                একটি নিরাপদ লেনদেনের নিশ্চয়তা দিতে এবং ভুল বোঝাবুঝি এড়াতে,
                বিক্রেতাদের জন্য সঠিক ডেলিভারি প্রদান করা খুবই গুরুত্বপূর্ণ৷ এটি
                আমাদের গ্রাহকদের দক্ষ এবং নির্ভরযোগ্য সার্ভিস প্রদান করতে সক্ষম
                করবে, বিক্রেতাদের তাদের ক্রেতাদের সাথে আস্থা তৈরি করার অনুমতি
                দেবে৷
              </Text>
            ) : (
              <Text style={[styles.text, { marginTop: 20 }]}>
                To guarantee a secure transaction and avoid misunderstandings,
                it is absolutely critical for sellers to provide proper delivery
                proof. This will enable us to provide efficient and reliable
                service to our customers, while allowing sellers to build trust
                with their buyers.
              </Text>
            )}
            {isBn ? (
              <Text style={[styles.text, { marginTop: 20 }]}>
                ডিউটিতে, আমরা পেশাদারিত্বের গুরুত্ব স্বীকার করি এবং নিশ্চিত করার
                জন্য পুঙ্খানুপুঙ্খ পরীক্ষার আমাদের বিতরণ প্রক্রিয়ার
                কার্যকারিতা৷ ফলস্বরূপ, আমরা ক্রমাগত মূল্যায়ন করা এবং আমাদের
                ডেলিভারি উন্নত করা আমাদের গ্রাহকদের সর্বোত্তম সার্ভিস প্রদানের
                পদ্ধতি৷
              </Text>
            ) : (
              <Text style={[styles.text, { marginTop: 20 }]}>
                At Duty, we recognize the importance of professionalism and
                thorough testing in ensuring the effectiveness of our delivery
                process. As a result, we continually evaluate and enhance our
                delivery procedures to provide the best possible service to our
                customers.
              </Text>
            )}
          </View>
        )}
        {index == 4 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 32,
            }}
          >
            {isBn ? (
              <Text style={styles.text}>
                যদি কোনো বিক্রেতা কোনো অর্ডার ডেলিভারি করতে অক্ষম হয়, অথবা যদি
                কোনো ক্রেতা আমাদের সহায়তা কেন্দ্রের সাথে আলোচনা করার পর কোনো
                অর্ডার বাতিল করে এবং ইতিমধ্যেই অর্থপ্রদান করে থাকে, তাহলে অর্ডার
                বাতিলের অনুরোধ গৃহীত হলে আমরা পেমেন্ট ফেরত প্রদান করব। 7-30
                কার্যদিবসের মধ্যে ক্রেতার অ্যাকাউন্টে সম্পূর্ণ অর্থ ফেরত দেওয়া
                হবে। অনুগ্রহ করে মনে রাখবেন যে অর্থ ফেরত একই অ্যাকাউন্টে জারি
                করা হবে যা অর্থপ্রদান করতে ব্যবহৃত হয়েছিল।
              </Text>
            ) : (
              <Text style={styles.text}>
                If a seller is unable to fulfill an order, or if a buyer cancels
                an order after discussing it with our support center and has
                already made payment, we will issue a refund if the cancel order
                request is accepted. The full amount will be refunded to the
                buyer's account within 7-30 working days. Please note that the
                refund will be issued to the same account that was used to make
                the payment.
              </Text>
            )}
            {isBn ? (
              <Text style={[styles.text, { marginTop: 20 }]}>
                যাইহোক, পরিস্থিতির উপর নির্ভর করে, ফেরত প্রক্রিয়া করতে আরও বেশি
                সময় লাগতে পারে। অনুগ্রহ করে মনে রাখবেন যে কিছু পেমেন্ট গেটওয়ে
                প্রদানকারী, যেমন বিকাশ এবং অন্যান্য পেমেন্ট গেটওয়ে, তারা যে
                চার্জব্যাক ফি চার্জ করে তা ফেরত দেয় না। এটা দুর্ভাগ্যবশত আমাদের
                নিয়ন্ত্রণের বাইরে। রিফান্ড সম্পূর্ণ হলে আমরা ব্যবহারকারীকে
                আমাদের প্ল্যাটফর্মে অবহিত করব।
              </Text>
            ) : (
              <Text style={[styles.text, { marginTop: 20 }]}>
                However, depending on the circumstances, it may take longer to
                process the refund. Please note that some payment gateway
                providers, such as Bikash and other payment gateways, do not
                refund the chargeback fees that they charged. This is
                unfortunately beyond our control. We will notify the user on our
                platform once the refund is completed.
              </Text>
            )}
            {isBn ? (
              <Text style={[styles.text, { marginTop: 20 }]}>
                আমাদের দল আমাদের গ্রাহকদের সর্বোত্তম পরিষেবা প্রদানের জন্য
                প্রতিশ্রুতিবদ্ধ এবং যত তাড়াতাড়ি সম্ভব ফেরত প্রক্রিয়া করার
                জন্য যথাসাধ্য চেষ্টা করবে। আমাদের রিফান্ড নীতি সম্পর্কে আপনার
                কোন প্রশ্ন বা উদ্বেগ থাকলে, অনুগ্রহ করে আমাদের সহায়তা দলের সাথে
                যোগাযোগ করতে দ্বিধা করবেন না। আরও বিশদ বিবরণের জন্য, অনুগ্রহ করে
                আমাদের অর্ডার নীতি বিভাগটি পড়ুন
              </Text>
            ) : (
              <Text style={[styles.text, { marginTop: 20 }]}>
                Our team is committed to providing the best possible service to
                our customers and will make every effort to process refunds as
                quickly as possible. If you have any questions or concerns about
                our refund policy, please do not hesitate to contact our support
                team. For more details, please refer to our Order Policy section
              </Text>
            )}
          </View>
        )}
        {index == 5 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 32,
            }}
          >
            {isBn ? (
              <Text style={styles.text}>
                আমাদের প্ল্যাটফর্ম ফিজিক্যাল সার্ভিস বিতরণের জন্য কোনও তৃতীয়
                পক্ষের ডেলিভারি সার্ভিসগুলি ব্যবহার কঠোরভাবে নিষিদ্ধ করি, যেমন
                কুরিয়ার সার্ভিস , ক্রেতা এবং বিক্রেতার মধ্যে সমস্ত লেনদেন
                অবশ্যই ব্যক্তিগতভাবে, মুখোমুখি হতে হবে, আমাদের ব্যবহারকারীদের
                নিরাপত্তা নিশ্চিত করতে৷ অধিকন্তু, একটি নিরাপদ এবং নির্ভরযোগ্য
                অর্থপ্রদানের প্রক্রিয়া প্রদান করতে, ডিউটি ​​প্ল্যাটফর্মের
                মাধ্যমে সমস্ত অর্থ প্রদান করতে হবে ৷ এটি একটি ক্রেতা বা বিক্রেতা
                কোনো তৃতীয় পক্ষের ডেলিভারি সার্ভিস ব্যবহার করে এবং পণ্য বা
                সার্ভিস সম্পর্কিত কোনো সমস্যা অনুভব করে, ডিউটিকে ​​কোনো ক্ষতির
                জন্য দায়ী করা যাবে না৷
              </Text>
            ) : (
              <Text style={styles.text}>
                Our platform does not allow for the delivery of the service via
                courier or any other means. Physical service delivery must be
                done face-to-face between the buyer and seller. To ensure the
                safety of all parties involved, we strongly recommend that the
                buyer and seller meet in a public place to exchange the service.
                If this is not possible, we advise that both parties take
                appropriate precautions to ensure a safe and secure exchange.
              </Text>
            )}
          </View>
        )}
        {index == 6 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 32,
            }}
          >
            {isBn ? (
              <Text style={styles.text}>
                {`
আমাদের প্ল্যাটফর্মে বিক্রেতারা তাদের উপার্জন সহজে এবং সুবিধাজনকভাবে প্রত্যাহার করতে পারে, তারা যে পরিমাণ টাকা তুলতে পারে তার কোনো সীমা নাই৷ যাইহোক, একটি প্রত্যাহারের অনুরোধ শুরু করার জন্য, বিক্রেতাদের প্রথমে তাদের অ্যাকাউন্ট যাচাই করতে হবে এবং আমরা শুধুমাত্র ব্যাংক থেকে উত্তোলন গ্রহণ করি৷

একবার তাদের অ্যাকাউন্ট যাচাই হয়ে গেলে, বিক্রেতারা ন্যূনতম ৫০ টাকা উত্তোলনের সীমা সহ যেকোন পরিমাণ টাকা তোলার অনুরোধ করতে পারেন৷ এটি লক্ষ্য করা গুরুত্বপূর্ণ যে সম্পূর্ণ সার্ভিসের জন্য শুধুমাত্র বিক্রেতার প্রত্যাহারের তহবিলে যোগ করা হবে, এটি নির্দেশ করে যে বিক্রেতা সফলভাবে ক্রেতার কাছে কোনো সমস্যা ছাড়াই সার্ভিসটি পৌঁছে দিয়েছেন, যদি কোনও সার্ভিস সম্পূর্ণ হিসাবে চিহ্নিত না করা হয় তবে পরিমাণটি থাকবে অমীমাংসিত তালিকায়৷

একটি প্রত্যাহারের/টাকা উত্তোলন অনুরোধ শুরু করতে, বিক্রেতা তাদের উপলব্ধ ব্যালেন্সের জন্য একটি প্রত্যাহারের অনুরোধ করতে পারেন৷ অনুরোধ পাওয়ার পর, আমরা এটি ৩-৭ কার্যদিবসের মধ্যে প্রক্রিয়াকরণ শুরু করব৷ যাইহোক, দয়া করে নোট করুন যে প্রক্রিয়াকরণের সময় পরিস্থিতির উপর নির্ভর করে পরিবর্তিত হতে পারে৷

প্রত্যাহারে/টাকা উত্তোলন প্রক্রিয়ার সাথে কোনো বিলম্ব বা সমস্যা এড়াতে, আমরা বিক্রেতাদের তাদের অ্যাকাউন্ট ব্যালেন্স সাবধানে পর্যালোচনা করার এবং প্রত্যাহারের অনুরোধ করার আগে তাদের কাছে পর্যাপ্ত তহবিল রয়েছে তা নিশ্চিত করার জন্য আমরা দৃঢ়ভাবে পরামর্শ দিই আমাদের প্ল্যাটফর্মে, আমরা বিক্রেতাদের জন্য একটি স্বচ্ছ এবং ঝামেলামুক্ত প্রক্রিয়া প্রদান করতে প্রতিশ্রুতিবদ্ধ তাদের আয় প্রত্যাহার করতে৷ অ্যাকাউন্ট যাচাইকরণ এবং একটি অপেক্ষার সময়কাল বাস্তবায়নের মাধ্যমে, আমরা সকল ব্যবহারকারীর জন্য একটি নিরাপদ এবং নির্ভরযোগ্য প্ল্যাটফর্ম নিশ্চিত করার লক্ষ্য রাখি৷
`}
              </Text>
            ) : (
              <Text style={styles.text}>
                On our platform, sellers can withdraw their earnings easily and
                conveniently, with no limits on the amount they can withdraw.
                However, to initiate a withdrawal request, sellers must first
                verify their account, and we only accept bank withdrawals. Once
                their account is verified, sellers can request a withdrawal of
                any amount, with a minimum withdrawal limit of 50 BDT. It's
                important to note that only the amount for completed services
                will be added to the seller's withdrawal fund, indicating that
                the seller has successfully delivered the service to the buyer
                without any issues. If a service is not marked as complete, the
                amount will remain in the pending list. To initiate a withdrawal
                request, the seller can request a withdrawal for their available
                balance. Upon receiving the request, we will begin processing it
                within 3-7 business days. However, please note that the
                processing time may vary depending on the situation. To avoid
                any delays or issues with the withdrawal process, we strongly
                advise sellers to carefully review their account balance and
                ensure they have sufficient funds available before requesting a
                withdrawal. At our platform, we are committed to providing a
                transparent and hassle-free process for sellers to withdraw
                their earnings. By implementing account verification and a
                waiting period, we aim to ensure a secure and reliable platform
                for all users.
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const backIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.5L7.5 12L15 4.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const styles = StyleSheet.create({
  text: {
    fontSize: 16,

    fontWeight: "400",
    color: "#4D4E4F",
  },
});
