import { Link, useNavigate } from 'react-router-dom'
const base = import.meta.env.BASE_URL;
import cafe2_1 from '/news/cafe2-1.jpg'
import cafe2_2 from '/news/cafe2-2.jpg'
import cafe2_3 from '/news/cafe2-3.jpg'
import SearchBar from './components/Searchbar'
import NewsNav from './components/NewsNav';
import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';


// 資料區
export const articles = [
    {
        id: 1,
        title: '明星咖啡館與那個年代：臺北文人的思想日常',
        titleEN: "The Star Café and That Era: The Everyday Thoughts of Taipei's Intellectuals",
        content: '在1960年代末的台北街頭，思想的自由仍在重重邊界之中遊走。學運、文藝、國際思潮交織而來，卻在某些地方悄然發酵──那不是課堂，也不是報社，而是街角的咖啡館。像是「明星咖啡館」這樣的空間，對當時的文青而言，不只是喝咖啡的場所，而是一種「精神的流浪地」。他們窩在藤椅裡，口中談論薩特、卡繆與尼采，筆記本裡寫下詩句、政治抒懷、未完成的小說，試圖在那一壺濃黑之中釋放內心的幽微躁動。',
        contentEN: "In the late 1960s, on the streets of Taipei, freedom of thought still wandered along the edges of tightly drawn boundaries. Student movements, literary arts, and international ideologies intertwined and quietly fermented—not in classrooms or newsrooms, but in corner cafés. Spaces like the “Star Café” were more than just places to drink coffee; to the intellectual youth of the time, they were sanctuaries for the restless mind. Curled up in rattan chairs, they spoke of Sartre, Camus, and Nietzsche. In their notebooks, they scribbled poems, political reflections, and unfinished novels—trying to release their subtle inner agitation into the depths of that strong, dark brew.",
        image: `${base}news/story1.png`,
        tag: '封面故事',
        tagEN: 'Cover Story',
        author: '故事編輯部',
        authorEN: 'Story Editorial Department',
        paragraphs: {
            p1: "白先勇筆下的明星咖啡館「明星」大概是台北最有歷史的咖啡館了。記得二十年前還在大學時代，「明星」便常常是我們聚會的所在。那時候，「明星」的老闆是一個白俄，蛋糕做得特別考究，奶油新鮮，又不甜膩，清新可口，頗有從前上海霞飛路上白俄西點店的風味。二樓陳設簡樸，帶著些許歐洲古風。那個時期，在台北上咖啡館還是一種小小的奢侈，有點洋派， 有點沙龍氣息。幸而「明星」的咖啡價錢並不算貴，偶爾為之，大家還去得起。",
            p2: "「明星」在武昌街，靠近重慶南路，門口騎樓下有一個書攤，這個書攤與眾 不同，不賣通俗雜誌，也不賣武俠小說，有不少詩集詩刊，也有《現代文學》 ，那便是孤獨國主周夢蝶的詩之王國。周夢蝶隱於市，在車馬喧囂中，參悟到明年髑髏的眼中，虞美人仍舊抽發茁長。《現代文學》常常剩下許多賣不出去的舊雜誌，我們便一包包提到武昌街，讓周夢蝶掛在孤獨國的寶座上， 然後步上「明星」的二樓，喝一杯濃郁的咖啡，度過一個文學的下午。",
            p3: "那時節「明星」文風蔚然。《創世紀》常在那裡校稿，後來《文學季刊》也在「明星」聚會。記得一次看到黃春明和施叔青便在「明星」二樓。六十年代的文學活動大多是同仁式的，一群文友，一本雜誌，大家就這樣樂此不疲的做了下去。當時我們寫作，好像也並沒有什麼崇高的使命感，沒有叫出驚人的口號──就是叫口號，恐怕也無人理睬。寫現代詩、現代小說，六十年代初，還在拓荒階段，一般人眼中，總有點行徑怪異，難以理解。寫出來的東西，多傳閱於同仁之間，朋友們一兩句好話，就算是莫大的鼓勵了。",
            p4: "然而在那片文學的寂天寞地中，默默耕耘，也自有一番不足與外人道的酸甜苦辣。於是台灣六十年的現代詩、現代小說，羼著明星咖啡的濃香，就那樣， 一朵朵靜靜的萌芽、開花。這幾年來，台北滄海桑田，面目全非，踟躕街頭，有時竟不知身在何方。東區新建的高樓大廈，巍巍然排山倒海而來，目為之眩。台北飯館多，其來 有自，但是這次回來，我發覺台北的咖啡館，竟也大街小巷，櫛比鱗次起來，猶如雨後春筍，完全取代了早年的「純喫茶」。而裝潢之瑰麗，五光十色，紐約東京瞠乎其後。有些名字取得妙──「夢咖啡」。聽說還有一家叫「杜鵑窩」的，不知道什麼人去光顧。價錢也不對了，坐下去就是六十塊，咖啡味道倒未必佳。或許是我的偏見，這些新興的咖啡館， 豪華是豪華，但太過炫耀了，有點暴發戶。我還是喜歡武昌街上那間灰撲撲的「明星」，「明星」的咖啡，「明星」的蛋糕，二十年來，香醇依舊。",
            p5: "──本文摘自〈明星咖啡館 Astoria〉，原發表於《聯合報》1979年10月 18日副刊",
        },
        paragraphsEN: {
            p1: "In Bai Xianyon's writing, the 'Star Café' was perhaps the most historic café in Taipei. I remember, back in my university days twenty years ago, it was one of our regular gathering spots. At that time, the owner of Star Café was a White Russian, known for making exquisite cakes—fresh cream, never overly sweet, light and delicious, evoking the taste of old Russian bakeries once found on Shanghai’s Avenue Joffre. The second floor was simply furnished, with a hint of old European charm. In those days, going to a café in Taipei was still something of a luxury—slightly Western, with a touch of salon culture. Fortunately, the prices at Star Café weren’t too high, so we could still afford to visit from time to time.",
            p2: "'Star Café' was located on Wuchang Street, near Chongqing South Road. Beneath the arcade at its entrance sat a unique bookstall—unlike others, it didn't sell popular magazines or martial arts novels. Instead, it offered poetry collections, literary journals, and issues of Modern Literature. This was the poetic kingdom of Zhou Mengdie, the solitary sovereign of solitude. Hidden amidst the bustling city, Zhou seemed to find enlightenment in chaos—discovering that even in the hollow eyes of next year's skull, poppies could still sprout and grow. Modern Literature often had unsold back issues, which we would bundle up and carry to Wuchang Street, placing them like offerings before Zhou Mengdie’s throne in his lonely kingdom. Then, we would climb to the second floor of Star Café, order a strong cup of coffee, and spend the afternoon immersed in literature.",
            p3: "In those days, the literary atmosphere at Star Café was flourishing. The Genesis literary group often proofread their manuscripts there, and later, the Literary Quarterly also began gathering at Star Café. I remember once seeing Huang Chunming and Shih Shu-ching sitting on the second floor. Most literary activity in the 1960s was grassroots in nature—a group of literary friends, a single magazine, and an unwavering passion that kept it all going. Back then, we didn't write with any lofty sense of mission, nor did we shout grand slogans—honestly, even if we had, no one would’ve paid attention. Writing modern poetry and fiction in the early '60s still felt like pioneering. To most people, we probably seemed eccentric, difficult to understand. The works we produced mostly circulated among fellow writers. Even just a few kind words from a friend felt like an enormous encouragement.",
            p4: "Yet amidst that literary wilderness, we toiled quietly, bearing joys and sorrows that words could hardly convey. And so, the modern poetry and fiction of 1960s Taiwan, infused with the rich aroma of Star Café's coffee, began to bud and bloom—one flower at a time, in quiet grace. In recent years, Taipei has changed beyond recognition. Walking through its streets, I sometimes no longer know where I am. Towering new buildings in the East District rise like waves upon waves, dazzling the eyes. Restaurants abound, as they always have. But this time returning, I noticed that cafés, too, now line every street and alley, sprouting like bamboo shoots after rain—completely replacing the old-fashioned chun ch’a (pure tea houses) of the past. Their interior designs are extravagant, dazzling, putting even New York and Tokyo to shame. Some have clever names—“Dream Café,” I heard. And there’s even one called “Cuckoo’s Nest,” though I have no idea who might go there. The prices are different now, too—just sitting down costs sixty dollars, and the coffee isn’t necessarily any good. Perhaps it’s just my bias, but these new cafés, for all their luxury, feel too showy—a little nouveau riche. I still prefer that dusty old Star Café on Wuchang Street. The coffee, the cakes—after twenty years, their flavor remains just as rich and comfortin",
            p5: "—Excerpt from 'Star Café (Astoria),' originally published in the United Daily News literary supplement, October 18, 1979.",
        },
        smImg: [`${base}news/story1_1.jpg`, `${base}news/story1_2.jpg`, `${base}news/story1_3.jpg`, `${base}news/story1_4.jpg`,],
        info: ['明星西點咖啡館Astoria', '地址：​台北市中正區武昌街一段7號'],
        infoEN: ['Astoria Cafe & Bakery', 'Address: No. 7, Wuchang St. Sec. 1, Zhongzheng Dist., Taipei City'],
    },
    {
        id: 2,
        title: '那些年，台灣喝的咖啡是什麼味',
        titleEN: "What was the taste of coffee in Taiwan back in those days?",
        content: '明清時期-零星摸索種植最早可推前至1624-1662年，當時少數荷蘭人早已悄悄引進咖啡樹，但僅限於荷蘭人自己飲用，不具有真正的商業價值與推廣意義。 下面敘述是最早可考據的文字紀錄，18世紀清光緒年間台灣開放商港後，英國「德記洋行」來台經商貿易，選擇從馬尼拉引進阿拉比卡品種， 種植區域主要於北部商港附近山區，包括現今新北市海山地區與台北市文山區，但短短三年時間，莊園因一把不明火炬整個燒光， 同時因北部緯度過高栽植過程水土不服，德記洋行因兩個主要原因選擇放棄。',
        contentEN: "The earliest known efforts to grow coffee in Taiwan can be traced back to the period between 1624 and 1662, during which a few Dutch settlers quietly introduced coffee plants to the island. However, the beans were reserved solely for Dutch consumption and held no real commercial value or promotional intent at the time.One of the earliest traceable written records dates to the 18th century, during the Guangxu reign of the Qing Dynasty. After Taiwan’s treaty ports were opened for trade, the British trading company 'Tait & Co.' established operations on the island. They chose to import Arabica coffee plants from Manila, selecting mountainous areas near northern commercial ports—mainly around what is now Haishan District in New Taipei City and Wenshan District in Taipei City—for cultivation. However, within just three years, the entire plantation was destroyed by an unexplained fire. Coupled with the region’s unsuitable climate and soil conditions due to its higher latitude, Tait & Co. eventually abandoned the venture for these two primary reasons",
        image: `${base}news/story2.jpg`,
        tag: '封面故事',
        tagEN: 'Cover Story',
        author: '川先生',
        authorEN: 'Mr. Chuan',
        paragraphs: {
            p1: "明清時期-零星摸索種植",
            p2: "最早可推前至1624-1662年，當時少數荷蘭人早已悄悄引進咖啡樹，但僅限於荷蘭人自己飲用，不具有真正的商業價值與推廣意義。 下面敘述是最早可考據的文字紀錄，18世紀清光緒年間台灣開放商港後，英國「德記洋行」來台經商貿易，選擇從馬尼拉引進阿拉比卡品種， 種植區域主要於北部商港附近山區，包括現今新北市海山地區與台北市文山區，但短短三年時間，莊園因一把不明火炬整個燒光， 同時因北部緯度過高栽植過程水土不服，德記洋行因兩個主要原因選擇放棄。",
            p3: "日據時期-天皇御用咖啡",
            p4: "台灣咖啡初展露光芒的起點，日據時期總督府引進巴西阿拉比卡品種，選擇於雲、嘉、南等地設立農事機構培育與教導種植， 試種區域概括台東豐田、花蓮瑞穗、高雄山區、雲林古坑、南投惠蓀…等地。其中又以古坑地區品質最為優良， 當時責任會社於古坑當地進行大面積農業調查，無論是土質、坡度、雨量、日照、氣候皆詳細記錄，並圈選海拔400-700公尺區間為主要栽植範圍， 涵蓋目前桂林村、華山村、樟湖村、荷苞村、大埔村，面積多達60公頃以上。 當中又以大尖山附近栽植之咖啡豆尤為佼佼者，榮獲當時日本天皇賞賜「御用咖啡」美名，更年年限定直送天皇、貴族飲用！1930年代可說是台灣咖啡的第一個黃金年代，大量銷售至海外遍及世界各地，知名產地不只古坑，還有日本人移民的台東豐田， 成立「木村珈琲株式會社」、「東台灣珈琲株式會社」都是當時知名的咖啡專賣商， 甚至「東台灣珈琲株式會社」更於後期取得841.225甲土地權利經營「日之初珈琲農場」， 其規模之龐大，直至今日仍可以說是台灣咖啡史上最大單一農場種植。",
            p5: "民國初期-棄置咖啡與轉耕作",
            p6: "二戰後，日本官員、企業單位撤回日本後，於台灣留下之農林事業皆由台灣林務局接手監理，戰後期間全球咖啡需求大量下降， 且當時台灣並未有咖啡飲用習慣，咖啡經濟作物價格滑落嚴重，同時林務局將農林事業分配至各縣市政府管理， 而百廢俱興的戰後期，屬於奢侈品與地位象徵之咖啡作物，絕非縣市政府主要推動之項目，市場與政府雙因素影響下， 直接導致超過1/2種植區域荒廢與轉作其他糧食作物。直至1956年美軍駐台，美國專業人才與嘉義農試所引進夏威夷抗旱及抗咖啡葉鏽病的技術， 才再次使原本幾近荒廢病化的台灣咖啡樹重獲新生，但1960年代，第三世界國家開始成長， 在第一級產業大量豐收的情況下，國際農作價格也隨之大跌，而此時美援也逐步退出台灣， 間接使台灣政府再次對待咖啡產業以「不鼓勵、不限制、不輔導」的政策對待，從此台灣咖啡產業進入歷時將近30年的冰河期！",
            p7: "遍地開花-政府推動與咖啡風潮",
            p8: "近五年台灣咖啡市場更逐漸開始轉型精品咖啡，咖啡店自家烘焙更成為一種常態， 根據2017年農委會數據，進口咖啡豆數量則達到驚人的30000公噸。雖然台灣咖啡時至今日每年總產量約莫1000公噸，但隨著精緻農業、高經濟作物價值、台灣精品咖啡市場習慣、 各地政府大力推廣、民間企業的共同努力，使得台灣咖啡種植規模開始有逐漸成長趨勢， 尤其是生豆品質的部分，台灣咖啡豆在世界競賽中屢獲佳績，種種因素下，各地小農開始再次重拾種植咖啡樹的信心。如今知名產區概括：阿里山、梅山、國姓、東山、瑞穗、太麻里、新社、信義、大樹…等地區， 可以說近乎全台山區皆可以發現咖啡莊園蹤跡。年年更舉辦多場咖啡展：台灣咖啡節(古坑)、東山咖啡節、桃園咖啡節、 台北國際茶/咖啡烘展、台中咖啡展…等活動。",
            p9: "──本文摘自〈台灣咖啡興衰史〉川咖啡",
        },
        paragraphsEN: {
            p1: "Ming and Qing Dynasties – Sporadic Exploration of Cultivation",
            p2: "The earliest introduction of coffee trees can be traced back to 1624–1662, when a few Dutch individuals secretly brought them in. However, the coffee was only consumed by the Dutch themselves and held no commercial value or promotional significance. The earliest traceable written record dates back to the 18th century during the reign of Emperor Guangxu of the Qing Dynasty, when Taiwan’s port cities opened to foreign trade. The British trading company “Tait & Co.” introduced the Arabica variety from Manila and chose to cultivate it in mountain areas near northern port cities—today’s Haishan District in New Taipei and Wenshan District in Taipei. However, after just three years, the entire plantation was destroyed in a mysterious fire. Additionally, due to the higher latitude in northern Taiwan, the coffee trees struggled to adapt to the environment. For these two main reasons, Tait & Co. abandoned the venture.",
            p3: "Japanese Colonial Era – The Emperor’s Exclusive Coffee Taiwan’s coffee industry began to truly shine during the Japanese colonial period.",
            p4: "The Japanese Governor-General’s Office introduced the Brazilian Arabica variety and established agricultural institutions in areas such as Yunlin, Chiayi, and Tainan to cultivate and teach coffee farming. Trial plantations were set up in places like Fongtian in Taitung, Ruisui in Hualien, mountain areas of Kaohsiung, Gukeng in Yunlin, and Huisun in Nantou. Among them, Gukeng stood out for producing the best quality beans. Agricultural investigations were carried out extensively in the area, with detailed records of soil quality, slope, rainfall, sunlight, and climate. The ideal cultivation elevation was identified as 400–700 meters above sea level, covering modern-day Guilin, Huashan, Zhanghu, Hebao, and Dapu villages, totaling over 60 hectares. Coffee grown near Dajianshan was considered the finest, earning the prestigious title of “Imperial Coffee” from the Japanese Emperor, and was delivered annually in limited quantities exclusively for the Emperor and nobility. The 1930s marked the first golden age of Taiwanese coffee, with widespread exports around the world. In addition to Gukeng, the Japanese immigrant community in Fongtian, Taitung, also established renowned coffee companies such as “Kimura Coffee Co., Ltd.” and “Eastern Taiwan Coffee Co., Ltd.” The latter even later acquired rights to 841.225 hectares of land to operate the “Hizuno Coffee Farm,” making it the largest single coffee plantation in Taiwan’s history.",
            p5: "Early Republic Era – Abandonment and Crop Shifts",
            p6: "During the post-war period, global demand for coffee significantly declined. At the same time, coffee was not yet a popular beverage in Taiwan, and its value as a cash crop dropped drastically. The Forestry Bureau decentralized the management of these agricultural lands to various county and city governments. In this period of post-war reconstruction, coffee—considered a luxury and a symbol of status—was far from a priority for local governments. As a result, more than half of the coffee-growing areas were either abandoned or converted to staple crops. It wasn’t until 1956, when U.S. military forces were stationed in Taiwan and agricultural experts from the U.S., along with the Chiayi Agricultural Research Station, introduced drought-resistant and rust-resistant technologies from Hawaii, that the nearly-dead coffee trees in Taiwan saw a revival. However, by the 1960s, as Third World countries began to grow rapidly and experienced bumper harvests, global agricultural prices plummeted. At the same time, U.S. aid to Taiwan gradually withdrew. This led the Taiwanese government to adopt a passive stance toward the coffee industry: no encouragement, no restrictions, and no support. Thus, the coffee industry entered a nearly 30-year-long Ice Age.",
            p7: "Blossoming Everywhere – Government Support and Coffee Craze",
            p8: "Over the past five years, Taiwan’s coffee market has gradually transformed into a specialty coffee industry. In-house roasting has become the norm among coffee shops. According to data from the Council of Agriculture in 2017, Taiwan imported a staggering 30,000 metric tons of coffee beans. Although Taiwan’s annual domestic production remains around 1,000 metric tons, the emphasis on precision agriculture, high-value crops, growing market demand for specialty coffee, strong government promotion, and corporate involvement have all contributed to a growing scale of coffee cultivation. Especially in terms of green bean quality, Taiwanese coffee beans have repeatedly excelled in international competitions, restoring farmers’ confidence in growing coffee trees. Today, notable coffee-growing regions include Alishan, Meishan, Guoxing, Dongshan, Ruisui, Taimali, Xinshe, Xinyi, and Dashu. In fact, coffee plantations can now be found in nearly every mountainous region across Taiwan. Numerous coffee festivals are held each year, including: Gukeng Coffee Festival, Dongshan Coffee Festival, Taoyuan Coffee Festival, Taipei International Tea/Coffee Exhibition, Taichung Coffee Show, and more.",
            p9: "──Excerpted from “The Rise and Fall of Taiwanese Coffee” by Chuan Coffee",
        },
        smImg: [`${base}news/story2_1.jpg`, `${base}news/story2_2.png`, `${base}news/story2_3.jpg`],
    },
    {
        id: 3,
        title: '步昂｜烘豆節奏與烘豆手法介紹！ 北歐快烘與日式慢烘的風味差異比較！',
        titleEN: "Roasting Rhythms & Techniques Explained! A Flavor Comparison Between Nordic Fast Roast and Japanese Slow Roast",
        content: '精品咖啡風味與「咖啡豆本身品質」以及「咖啡豆處理方式」有密切關係，而其中又以咖啡烘豆手法對風味產生極大的影響。由於咖啡豆烘焙過程會經歷一連串化學反應，像是梅納反應、焦糖化反應等等，讓咖啡呈現出豐富多樣的風味口感。國際咖啡中烘焙手法也十分多元，以烘豆節奏區分的兩大經典派系：「北歐快烘」和「日式慢烘」。精品咖啡風味與「咖啡豆本身品質」以及「咖啡豆處理方式」有密切關係，而其中又以咖啡烘豆手法對風味產生極大的影響。由於咖啡豆烘焙過程會經歷一連串化學反應，像是梅納反應、焦糖化反應等等，讓咖啡呈現出豐富多樣的風味口感。',
        contentEN: "The flavor of specialty coffee is closely tied to both the quality of the coffee beans themselves and the methods used to process them. Among all the factors, the roasting technique plays a particularly crucial role in shaping the final taste. During the roasting process, coffee beans undergo a series of complex chemical reactions—most notably the Maillard reaction and caramelization—which give rise to the coffee’s rich and diverse flavor profiles. Globally, roasting techniques vary widely, but two classic schools stand out when it comes to roasting tempo: the Nordic fast roast and the Japanese slow roast. These two approaches reflect not only differences in technique but also distinct philosophies of how coffee should taste and be experienced.",
        image: `${base}news/story3.jpg`,
        tag: '咖啡教學',
        tagEN: 'Coffee Tutorial',
        author: '步昂專欄',
        authorEN: "Buon's Column",
        paragraphs: {
            p1: "烘豆節奏是什麼？",
            p2: "在介紹兩種烘豆手法前先來認識何謂「烘豆節奏」，烘豆節奏顧名思義就是烘焙咖啡豆過程中受熱變化的速度快慢，由於烘豆節奏對咖啡風味會有很直接的影響，因此非常考驗烘豆師的掌控技巧！",
            p3: "北歐快烘——烘出既新奇又青澀酸甜的異國風味",
            p4: "酸酸甜甜的口感與在唇頰綻放開來的花香果香，是北歐快烘手法的獨特風味！北歐快烘手法在臺灣比較少見，主要盛行於北歐國家，尤其在挪威的咖啡風味。初次品嚐北歐快烘手法的人或多或少會對酸味有些不適應，也有些人認為「喝起來像果汁般」、「色澤看起來非常淺喝起來口感較為單薄甚至會帶點青澀」。北歐快烘這般特殊的風味來自於節奏明快的烘豆手法，入豆後不特別將風門關小，而是會採用較大火、較大風門，再分階段微降火。在烘豆曲線上會與慢烘形成強烈對比，花費很短的時間就能達到相同的豆溫！由於過程中梅納反應和焦糖化反應的時間短，保留了更多咖啡豆本身的豆子滋味，也因此北歐快烘對於生豆的品質要求會比較高，否則烘焙後反而會凸顯豆子的缺陷！ ",
            p5: "日式慢烘——烘出溫厚儒雅的個性風味",
            p6: "濃、醇、香四溢的厚實風味，在口舌尖纏綿著滑順質地，餘韻十足，也讓人不禁抿了抿嘴唇，感受唇邊殘留的清香。帶了點巧克力、堅果香氣，這樣充滿畫面感熟悉的咖啡風味與溫度，是來自日式慢烘的手法。在日本，人們更在意咖啡的風味層次與溫和優雅的甘苦味，因此在處理咖啡豆上堅持以「小火烘焙」。剛入豆時小心地控制火力，讓溫度慢慢升高不要過速，再依照偏好的風味逐步調整，細膩地掌握香味與口感等等的發展，讓熱量均衡地散佈於咖啡豆中，端出更柔和、更醇厚的風味。日式慢烘的手法除了生豆品質之外，更考驗烘豆師的功夫底蘊，烘焙時間、火候的精準把控，也需要高度專注力與耐心，因此每杯咖啡都能感受到烘豆師投注的滿滿心意！",
            p7: "嘗試再嘗試，抓到自己喜愛的烘豆節奏",
            p8: "烘豆節奏之所以說是「節奏」，是因為它沒有一個固定的時間。依照每次使用的生豆狀態以及期待烘出來的風味而不相同，在有了多次的嘗試和經驗後，就能抓到與咖啡豆共舞的節奏感，精準地控制發展速度以及穩定性！咖啡豆烘焙的世界很有趣，除了透過每次烘焙精進掌控度與技巧之外，其實品味也是很重要的！當品嚐過的咖啡風味更豐富、更多元後，視野便會被打開，擁有更深厚的咖啡知識水平，就有機會突破固有而創新，帶給人們前所未有的味覺饗宴！就像初踏入咖啡領域時，嚐過明亮酸、濃郁香醇或花果香氣後，以為這就是咖啡世界的全部。然而當品嚐到曼特寧 的深厚木質苦味、耶加雪菲 的微酸又清新優雅的茶感過後，重新打破既有認知、開闊眼界！這也是步昂咖啡致力精選多樣風味咖啡的想法，期待豐富人們對咖啡的認識，這次不妨試試過去未曾品嚐過的口味，也許在衝擊五感體驗時，能因而烘焙出創新的風味！",
            p9: "──本文摘自〈【咖啡知識】烘豆節奏與烘豆手法介紹！ 北歐快烘與日式慢烘的風味差異比較！〉發表於2022-12-05步昂專欄",
        },
        paragraphsEN: {
            p1: "What is roasting rhythm?",
            p2: "Before introducing the two roasting methods, let’s first understand what “roasting rhythm” means. As the name suggests, roasting rhythm refers to the speed of heat change during the coffee roasting process. Since roasting rhythm directly affects the flavor of the coffee, it is a true test of a roaster’s control skills!",
            p3: "Nordic Fast Roasting — Brings out exotic flavors that are both novel and tart-sweet",
            p4: "A tart and sweet taste accompanied by floral and fruity aromas blooming on the lips and cheeks is the unique flavor of the Nordic fast roasting method! This method is rarely seen in Taiwan and is mainly popular in Nordic countries, especially in Norwegian coffee. First-time tasters of Nordic fast roasted coffee may find the sourness a bit off-putting, and some people even say “it tastes like juice” or “looks very light in color, tastes thin, and may even have a bit of greenness.” This unique flavor comes from a fast-paced roasting technique: after the beans are dropped in, the airflow is not reduced, but rather a high flame and wide air vent are used, with gradual fire reduction in stages. On the roasting curve, it creates a stark contrast to slow roasting, reaching the same bean temperature in a much shorter time! Because the Maillard reaction and caramelization happen in a short span, more of the original bean flavors are retained. Therefore, Nordic fast roasting has higher requirements for raw bean quality; otherwise, roasting can highlight the defects in the beans! ",
            p5: "Japanese Slow Roasting — Brings out a warm, refined, and mellow personality in flavor",
            p6: "A rich, mellow aroma fills the mouth with a smooth texture, leaving a lingering finish that makes one purse their lips to savor the fragrant aftertaste. With hints of chocolate and nutty aromas, this vivid and familiar coffee flavor and warmth come from the Japanese slow roasting method. In Japan, people place more importance on coffee's flavor layers and the gentle, elegant balance of bitterness and sweetness. Therefore, they insist on “low flame roasting” when handling coffee beans. At the start of roasting, the flame is carefully controlled to allow the temperature to rise slowly, and then gradually adjusted based on desired flavors, delicately managing the development of aroma and taste. This ensures even heat distribution in the beans and brings out a gentler, more mellow flavor. Japanese slow roasting not only depends on bean quality but also tests the roaster’s true skill. Precise control over roasting time and temperature, along with high focus and patience, allow every cup of coffee to embody the roaster’s heartfelt dedication!",
            p7: "Keep trying until you find your own preferred roasting rhythm",
            p8: "Roasting rhythm is called a “rhythm” because it does not have a fixed duration. It varies depending on the condition of the beans used each time and the flavor you aim to achieve. With repeated trials and experience, you’ll be able to grasp the rhythm of dancing with the beans, precisely controlling development speed and stability! The world of coffee roasting is fascinating—not only can you improve your control and skills with each roast, but your taste is also very important! As you taste a wider variety of coffee flavors, your perspective expands, and your coffee knowledge deepens. Then you’ll have the opportunity to break old boundaries and innovate, delivering an unprecedented flavor experience! Just like when you first entered the world of coffee—after tasting bright acidity, rich aroma, or floral and fruity notes—you might think that’s all there is. But after trying the deep woody bitterness of Mandheling or the lightly acidic, refreshing tea-like flavor of Yirgacheffe, your prior understanding is overturned and your horizons broadened! This is exactly the idea behind Buon Coffee’s effort to curate a diverse range of flavors—hoping to enrich people’s knowledge of coffee. This time, why not try a flavor you’ve never tasted before? Perhaps, in stimulating your senses, you may just discover a new and innovative roasting flavor!",
            p9: "This article is excerpted from “【Coffee Knowledge】Introduction to Roasting Rhythm and Roasting Techniques! Flavor Comparison Between Nordic Fast Roasting and Japanese Slow Roasting!” published on 2022-12-05 in the Buon Coffee column.",
        },
        smImg: [`${base}news/story3_1.jpg`,],
    },
    {
        id: 4,
        title: '手沖咖啡總是不對味？掌握技巧與比例，輕鬆享受好咖啡',
        titleEN: "Why Your Pour-Over Coffee Doesn't Taste Right? Master the Techniques and Ratios for a Better Brew",
        content: '手沖咖啡能夠忠實發揮咖啡豆多層次的味譜，近期在國內外盛行。對於咖啡愛好者來說，手沖咖啡除了深入體會不同豆子的真實風味，也能更加了解咖啡其中的奧秘。而究竟手沖咖啡技巧有哪些呢？這篇文章將詳細介紹手沖咖啡步驟，讓你輕鬆享受手沖咖啡的趣味。',
        contentEN: 'Pour-over coffee has gained popularity both in Taiwan and around the world for its ability to faithfully express the layered flavor profile of coffee beans. For coffee enthusiasts, the pour-over method is not only a way to explore the true characteristics of different beans, but also a pathway to deeper understanding of coffee’s complexity and craftsmanship. So, what exactly are the key techniques behind a great pour-over? This article will walk you through the step-by-step process, helping you enjoy the art of hand-brewing coffee with ease and pleasure.',
        image: `${base}news/story4.jpg`,
        tag: '咖啡教學',
        tagEN: 'Coffee Tutorial',
        author: '湛盧',
        authorEN: 'Zhanlu',
        paragraphs: {
            p1: "手沖咖啡有什麼不同之處令人著迷？了解咖啡真正的樣貌<br>咖啡百百種，除了最平價方便的「即溶咖啡」以外，還有用機器沖煮的「義式咖啡」，當然就是本篇重點「手沖咖啡」；即溶咖啡是將咖啡豆研磨萃取濃縮後製成，雖然快速又便宜但與其他兩者相比較缺少咖啡本身的風味。<br><br>而義式與手沖咖啡同樣都是現磨咖啡又有什麼不一樣呢？義式濃縮咖啡需要使用大型的咖啡機製成，透過氣壓快速的萃取，咖啡液濃度會較濃，且原有的精緻味譜可能會被掩蓋。手沖咖啡使用直覺的方式沖泡，更容易品嘗到咖啡豆原有的風味，器具也能簡單輕易入手，依照個人喜好調整各項數值，每次的沖泡結果都會有所不同，搭配出最適合的黃金比例，就是手沖咖啡令人著迷的原因。",
            p2: "手沖咖啡教學，帶你認識手沖咖啡器具與沖泡步驟<br>手沖咖啡無需高超的沖泡技術，只要準備好沖泡器具，掌握手沖咖啡7大步驟，便能泡出一杯獨一無二的好咖啡。<br><br>掌握簡單7個手沖咖啡步驟<br>・步驟一：磨咖啡豆<br>手沖咖啡適合使用中研磨的粗細，刻度大約4或4.5，像2號砂糖的顆粒大小。<br><br>・步驟二：準備熱水<br>手沖咖啡水的溫度建議90℃左右，適中風味的粉水比為1:16，意思是水量為咖啡粉的16倍。<br><br>・步驟三：沖洗濾紙、倒粉<br>將濾紙服貼的放入濾杯中，用些許熱水浸濕濾紙及預熱濾杯，再倒掉咖啡壺中的水。將咖啡粉倒入濾杯，輕拍濾杯使咖啡粉表面平整。<br><br>・步驟四：第一次注水<br>由濾杯中心開始注水，慢慢的從內向外畫圈再繞回中心，熱水不可沖到濾紙，將所有咖啡粉浸濕後停止注水。<br><br>・步驟五：悶蒸<br>咖啡粉會開始膨脹像泡芙一樣，悶蒸等待約30秒，等膨脹的咖啡粉開始塌陷後，方可進行下一步驟。如咖啡粉不太膨脹，表示咖啡豆不夠新鮮，悶蒸不成功會影響最後咖啡的風味。<br><br>・步驟六：第二次注水<br>與第一次注水一樣，由中心向外畫圈再繞回中心重複動作，水流需控制穩定且少量的注入，此步驟需注水大約2分鐘，注意電子秤顯示的重量，水量到達時停止注水。<br><br>・步驟七：萃取時間<br>當萃取量足夠即可移開濾杯，不需等熱水全部滴完，以免最後的萃取液苦味太重。",
            p3: "手沖咖啡器具<br>沖煮時需要使用到的器具有：磨豆機、濾紙、濾杯、咖啡壺、手沖壺、電子秤、溫度計。",
        },
        paragraphsEN: {
            p1: "What makes pour-over coffee so fascinating? Discovering the true essence of coffee. There are countless types of coffee. In addition to the most affordable and convenient 'instant coffee,' there’s also machine-brewed 'espresso,' and of course, the focus of this article—'pour-over coffee.' Instant coffee is made by grinding and extracting coffee beans into a concentrate, then drying it into powder. Although it is quick and inexpensive, it lacks the original flavor of coffee compared to the other two methods. So what’s the difference between espresso and pour-over coffee, since both use freshly ground beans? Espresso requires large coffee machines and uses pressure for quick extraction. The resulting coffee is more concentrated, but its delicate flavor profile may be masked. Pour-over coffee, on the other hand, uses an intuitive brewing method that allows for easier appreciation of the coffee bean’s original flavor. The equipment is simple and easy to obtain, and you can adjust various parameters based on personal preference. Since the result of each brew can vary, finding the perfect golden ratio is exactly what makes pour-over coffee so captivating.",
            p2: "Pour-over coffee tutorial: Get to know pour-over equipment and brewing steps. Pour-over coffee doesn’t require advanced brewing skills. As long as you have the equipment and follow the 7 key steps, you can make a unique and delicious cup of coffee. Master these 7 simple pour-over coffee steps: <br>・Step 1: Grind the coffee beans <br> Medium grind is suitable for pour-over coffee, with a grind setting around 4 or 4.5—similar to the size of #2 sugar granules.<br><br>・Step 2: Prepare hot water <br> The ideal water temperature for pour-over coffee is around 90°C. A good powder-to-water ratio for balanced flavor is 1:16, meaning the water volume should be 16 times the coffee grounds. <br><br>・Step 3: Rinse the filter paper and add grounds <br>Place the filter paper snugly into the dripper, use a bit of hot water to moisten the filter and preheat the dripper, then discard the water from the pot. Pour the coffee grounds into the filter, and gently tap the dripper to level the surface.<br><br>・Step 4: First pour <br> Start pouring water from the center of the dripper, slowly drawing circles outward and then back to the center. Do not pour water onto the filter paper. Stop pouring once all the coffee grounds are evenly wet.<br><br>・Step 5: Bloom<br>The coffee grounds will begin to expand like a puff. Let it bloom for about 30 seconds. Wait until the bloomed grounds start to collapse before moving on to the next step. If the grounds don’t expand much, it indicates the beans are not fresh. Unsuccessful blooming will affect the final flavor of the coffee.<br><br>・Step 6: Second pour<br>Just like the first pour, move from the center outward and back to the center in circles. Keep the water flow stable and pour in small amounts. This step should take about 2 minutes. Monitor the weight on the digital scale and stop pouring once the target water volume is reached.<br><br>・Step 7: Extraction time<br>When the desired extraction volume is reached, remove the dripper. There is no need to wait for all the water to drip through, as the final extract may carry too much bitterness.",
            p3: "Pour-over coffee equipment<br>The tools needed for brewing include: a coffee grinder, filter paper, dripper, coffee server, gooseneck kettle, digital scale, and thermometer.",
        },
        smImg: [`${base}news/story4_1.jpg`, `${base}news/story4_2.jpg`,],
        info: ['湛盧咖啡', '地址：台北市大安區新生南路一段161巷2-1號'],
        infoEN: ['Zhanlu Coffee', 'Address: No. 2-1, Ln. 161, Sec. 1, Xinsheng S. Rd., Da’an Dist., Taipei City'],
    },


];

export const hotArticles = [
    {
        id: 101,
        title: '大稻埕最美秘境，預約制老宅咖啡館AKA café！',
        titleEN: "Dadaocheng's Most Beautiful Hidden Gem — The Reservation-Only Heritage Café, AKA café!",
        content: 'AKA café 藏身於大稻埕的百年老宅中，老屋紅磚與現代設計交織出懷舊又摩登的氛圍。推開木門，陽光灑落在磨石子地板上，老傢俱搭配極簡美學，彷彿時光暫停。這裡不只是喝咖啡的地方，更像一場舊時光與當代品味的對話。',
        contentEN: "AKA café Tucked away in a century-old house in Dadaocheng, AKA café blends red brick walls with modern design, creating a space where nostalgia meets contemporary elegance. Push open the wooden door and you’ll find sunlight pouring across terrazzo floors, where vintage furniture meets minimalist aesthetics—evoking the feeling that time has quietly paused. More than just a place to drink coffee, AKA café feels like a quiet conversation between the past and present.",
        image: `${base}news/cafe1.jpg`,
        tag: '精選咖啡廳',
        tagEN: 'Featured Café',
        author: 'Coco Huang',
        authorEN: 'Coco Huang',
        paragraphs: {
            p1: "隱身於大稻埕百年老宅的AKA café，因「不可參觀、需預約、不併桌、禁拍照」等嚴格規矩，讓不少人望之卻步。然而，一旦按下門鈴、隨著引導穿越窄巷入內，便能瞬間感受到空間裡沈積百年的光影與質感，彷彿走入過去富貴人家的日常場景。",
            p2: "AKA café 透過空間細節、氣味、光線等元素，無聲地述說著大稻埕昔日的輝煌與優雅，讓人猶如穿越百年時光，與老城記憶不期而遇。這樣的氛圍，也喚起了我們對曾經『最好的時光』的追憶與眷戀。",
            p3: "正如朱天文在《最好的時光》中所言：「最好的時光，是一種不再回返的幸福之感。」AKA café 所營造的感受，正是這種因永恆失落而倍感珍貴的懷舊情懷，讓空間成為記憶與時間的容器。",
            p4: "咖啡館的主理人 Neo 提到，這棟老宅過去是大稻埕富商郭烏隆的家宅，他以經營郭怡美商行致富，專營雜穀、麵粉與糖品。這處如今的咖啡館，曾是他位於迪化街與民樂街之間的宅邸，靜靜埋藏於城市一角，如同被時光遺忘的秘密。",
            p5: "除了空間本身的故事，AKA café 在味覺上的講究也不容忽視。主理人特別邀請來自東京的咖啡職人 Yoshi 駐店，帶來如藝術品般的手沖單品咖啡體驗，其中「大稻埕」風味最具代表性。",
            p6: "Yoshi 使用 ORIGAMI 濾杯手工沖煮的「大稻埕」咖啡，蘊含著堅果與藥草香氣，溫潤又層次分明，搭配迪化街百年老店龍月堂的糕點，一口一口，品味的不只是精品咖啡，更是一段關於城市、歷史與記憶的生活方式。"
        },
        paragraphsEN: {
            p1: "Tucked away in a century-old residence in Dadaocheng, AKA café is known for its strict rules—no walk-ins, reservations only, no shared tables, and no photography—which have deterred many curious visitors. Yet, the moment you press the doorbell and are guided through a narrow alley, you are instantly immersed in a space imbued with the textures and light of a bygone era, as if stepping into the daily life of a once-prosperous household.",
            p2: "Through its meticulous attention to detail—spatial elements, scents, and light—AKA café silently tells the story of Dadaocheng’s former glory and grace. The atmosphere evokes the feeling of traveling back a hundred years, unexpectedly encountering the city’s forgotten memories. It stirs within us a nostalgic longing for what we once called “the best of times.”",
            p3: "As Chu T’ien-wen writes in The Best of Times: “The best of times is the feeling of a happiness that will never return.” The ambiance created by AKA café encapsulates this sense of loss-tinged beauty, making the space a vessel for memory and time.",
            p4: "According to Neo, the café’s founder, this old house once belonged to Guo Wulong, a wealthy merchant of Dadaocheng who made his fortune running the Guo Yi Mei Trading Company, specializing in grains, flour, and sugar. This very building, nestled between Dihua Street and Minle Street, was once his residence. Today, it lies quietly in a forgotten corner of the city, like a secret preserved by time.",
            p5: "Beyond its compelling spatial narrative, AKA café also excels in flavor. Neo invited Yoshi, a coffee artisan from Tokyo, to reside and brew at the café, offering hand-poured specialty coffee that resembles art. The most iconic among them is the blend named “Dadaocheng.”",
            p6: "Brewed with an ORIGAMI dripper, Yoshi’s “Dadaocheng” coffee exudes notes of nuts and herbs—warm, refined, and richly layered. Paired with traditional pastries from Long Yuetang, a century-old shop on Dihua Street, each sip offers not just a premium coffee experience, but a taste of the city’s living history—a lifestyle interwoven with heritage and memory."
        },
        smImg: [`${base}news/cafe1_1.jpg`, `${base}news/cafe1_2.jpg`, `${base}news/cafe1_3.jpg`,],
        info: ['AKA café 老宅咖啡廳', '地址：103台北市大同區民樂街66號後棟'],
        infoEN: ['AKA café Old House Cafe', 'Address: Rear Building, No. 66, Minle St., Datong Dist., Taipei City 103'],

    },
    {
        id: 102,
        title: '種蘭花的溫室改造而成！大稻埕「小尾咖啡」隱身二樓老宅，明亮採光包覆空間',
        titleEN: "Once a greenhouse for orchids, now a café with charm — “Xiaowei Coffee” is tucked away on the second floor of a historic Dadaocheng building, where soft natural light fills the space.",
        content: '前身為蘭花溫室的老宅空間改造，小尾咖啡由Allen與設計師筱婷合作打造，空間保留原貌，結合喫茶店元素與黑膠唱片、雜誌牆，成為充滿交流與個性的小隱秘境。樓中樓設計讓人有探索的趣味，傳遞對咖啡與空間的熱愛。',
        contentEN: "Formerly an orchid greenhouse, this renovated heritage space is now home to Xiaowei Coffee — a cozy, character-filled café created by Allen in collaboration with designer Hsiao-Ting. The space retains much of its original charm, blending elements of traditional Japanese kissaten with a vinyl record collection and a wall of magazines, creating an intimate haven for creativity and conversation. Its loft-style split-level layout invites exploration, subtly reflecting the team’s deep passion for both coffee and spatial design.",
        image: `${base}news/cafe2.jpg`,
        tag: '精選咖啡廳',
        tagEN: 'Featured Café',
        author: '洪雅筠',
        authorEN: 'Hung Ya-Yun',
        paragraphs: {
            p1: "疫情過後的大稻埕風景變動頻繁，一些老店退出，一些新面孔進駐，但歷史與文化的厚度依然存在。就在台北橋邊，一棟屋齡六十年的老房子悄然轉變成咖啡館。主理人Allen與設計師筱婷，憑藉對老城區的熱愛與偶然的靈感，共同打造了『小尾咖啡』。",
            p2: "這間咖啡館前身是蘭花溫室，保留了半透明屋頂，日光灑落如同舊日午後的暖意。設計上保留原木結構與色調，重新整理管線、拓寬樓梯，並融入喫茶店元素如馬賽克磚、清水模，讓空間既懷舊又現代。小尾咖啡隱身於一樓摩托車改裝店之後，需先按門鈴、穿越店面才能抵達二樓的咖啡館。這段昏暗與明亮交替的過程，宛如一次都市探險，也因此讓空間多了一份神秘與私密的氛圍。",
            p3: "創店的契機來自一次意外的發現。筱婷原是在幫一樓店主整修空間，偶然踏上二樓後深受吸引。之後透過朋友牽線認識Allen，兩人雖無共事經驗，卻因共同理念而決定合作創業，各自的夢想在此交會。",
            p4: "空間配置刻意保留寬敞與安靜，座位不多，像是一座秘密基地。整面雜誌牆隨季節更換主題，黑膠唱片則依照兩人喜好挑選與更新，使這裡成為藝術與生活風格交流的平台。曾經他們也設想開放讓顧客播放自帶黑膠唱片，創造如同個人工作室般的自由感。然而考量到每人音樂風格差異，只能在理想與現實之間取得平衡，呈現最適合這個空間的音樂風景。",
        },
        paragraphsEN: {
            p1: 'After the pandemic, the landscape of Dadaocheng changed frequently; some old shops closed, while new faces moved in. Yet, the depth of history and culture remains. Right by the Taipei Bridge, a sixty-year-old house quietly transformed into a coffee shop. Owners Allen and Xiaoting, driven by their love for the old city district and a serendipitous inspiration, jointly created "Tinytail Coffee."',
            p2: 'Formerly an orchid greenhouse, the cafe retains its translucent roof, allowing sunlight to stream in like the warm glow of an old afternoon. The design preserves the original wooden structure and tones, re-routing pipes and widening the stairs, while incorporating "kissaten" (Japanese tearoom) elements like mosaic tiles and fair-faced concrete. This makes the space both nostalgic and modern. Tinytail Coffee is hidden behind a motorcycle modification shop on the first floor, requiring visitors to ring a doorbell and pass through the shop to reach the cafe on the second floor. This transition between dimness and brightness is like an urban exploration, adding a sense of mystery and privacy to the space.',
            p3: 'The idea for the shop came from an unexpected discovery. Xiaoting was originally renovating the first-floor shop for its owner and was drawn to the second floor upon stumbling upon it. Later, through a friend, she met Allen. Despite no prior work experience together, their shared vision led them to collaborate and start a business, their respective dreams converging here.',
            p4: 'The space is intentionally kept spacious and quiet, with limited seating, akin to a secret base. The entire magazine wall changes themes seasonally, and vinyl records are selected and updated according to their preferences, making it a platform for art and lifestyle exchange. They once considered allowing customers to play their own vinyl records to create a sense of freedom, much like a personal studio. However, considering the diverse musical tastes of individuals, they had to strike a balance between ideal and reality, presenting the music landscape most suitable for this space.',
        },
        smImg: [cafe2_1, cafe2_2, cafe2_3],
        info: ['小尾咖啡Tinytail_coffee', '地址：103台北市大同區民權西路302號2樓'],
        infoEN: ['Tinytail_coffee', 'Address: 2F, No. 302, Minquan W. Rd., Datong Dist., Taipei City 103'],
    },
    {
        id: 103,
        title: '隱身大稻埕迪化街的老宅秘境！「裏 Ura.219」',
        titleEN: "A Hidden Gem in a Historic Dadaocheng House — 'Ura.219' on Dihua Street",
        content: '「裏 Ura.219」結合服裝、陶藝、植物與茶屋的複合式空間，強調「痕跡」與「不完美」的美學。內部庭院融合日式禪意造景、枯山水步道及古物選品，強調歷史痕跡與生命流動，營造靜謐而充滿藝術氣息的空間體驗，呼應大稻埕的文化底蘊。',
        contentEN: "'Ura.219' is a multidisciplinary space that blends fashion, ceramics, plants, and a teahouse, centered around an aesthetic of 'traces' and 'imperfection.' Its inner courtyard features elements of Japanese Zen landscaping, a dry garden stone path, and curated vintage objects—each chosen to reflect the passage of time and the rhythm of life. The result is a serene, artful environment that resonates deeply with the cultural richness of Dadaocheng, offering visitors an immersive experience where history and contemporary expression coexist.",
        image: `${base}news/cafe3.jpg`,
        tag: '精選咖啡廳',
        tagEN: 'Featured Café',
        author: 'Willy.En和Amber Chiu',
        authorEN: 'Willy.En, Amber Chiu',
        paragraphs: {
            p1: "2022 年，『Merci 裏山』在台北陽明山開幕，結合溫室、植栽、老物與茶室等元素，營造出兼具藝文氣息與自然靜謐感的空間，吸引眾多風格人士造訪。到了 2023 年底，裏山與服裝品牌 Professor.E 攜手在大稻埕推出全新複合式空間『裏 Ura.219』，將服飾、塊根植物、咖啡、茶屋與古物美學融合，為熙攘的迪化街注入一抹安靜且深層的文化氣息。",
            p2: "『大稻埕傳遞的氛圍相當符合裏 Ura.219 的精神理念。』原來 Ken 早在兩年前便已租下這棟古宅作為品牌 Showroom，選址於這座蘊含歷史記憶的老城區，像是命中註定般的選擇。前棟空間陳列著 Professor.E、陶藝品牌 Objectby1218 以及多款古物選品，營造出現代與舊物交錯的場景。",
            p3: "Professor.E 的『Forgotten Materials』系列，以手工植物染、鐵鏽染、擦色等工藝呈現斑駁質感，與空間中老壁紙、手工塗料、褪色牆面相互映襯。這種斑駁並非隨意，而是一種被刻意保存的『痕跡』——品牌想要傳遞的不完美之美，也成為空間中最動人的視覺語言。",
            p4: "正如設計者所說：「與其說斑駁感，不如說是痕跡。」Professor.E 的設計講求材料與文化的層層堆疊，例如將中國廣州的香雲紗布料用於歐式西裝外套，即展現出衝突與融合之美，而這種矛盾交錯的語彙，也讓空間本身充滿了難以取代的個性。",
            p5: "走進中庭，由一攬芳華設計與裏山團隊聯手打造的天井庭院，參照枯山水鋪設碎石步道，周圍植栽錯落、樹影婆娑，呈現清幽的日式禪意氛圍。這片靜謐庭園不僅是通道，更是一個讓人停留、感受、沉靜下來的自然之境。",
            p6: "展示架上擺放著裏山選品的日本盆栽與 0343 Conservatory 的塊根植物，每一株綠意都帶著自然生命的痕跡與姿態。正如品牌所說：「植物是生命體，它的不確定性和變化正好體現時間的流動。」這些植物成為空間最生動的存在，也讓『裏 Ura.219』展現出強烈的生命力與靜謐並存的詩意美感。"
        },
        paragraphsEN: {
            p1: 'In 2022, "Merci Ura-yama" opened in Yangmingshan, Taipei, combining elements like greenhouses, plants, antiques, and tea rooms to create a space with both artistic flair and natural tranquility, attracting many style-conscious visitors. By the end of 2023, Ura-yama collaborated with clothing brand Professor.E to launch a new multi-functional space, "Ura.219," in Dadaocheng. It integrates apparel, caudex plants, coffee, a tea house, and antique aesthetics, injecting a quiet and profound cultural ambiance into the bustling Dihua Street.',
            p2: '"The atmosphere conveyed by Dadaocheng perfectly aligns with the spirit and philosophy of Ura.219." Ken had actually leased this old house two years prior as a brand showroom. Choosing this historic old district felt like a fated decision. The front section of the space displays Professor.E, the pottery brand Objectby1218, and various antique selections, creating a scene where modern and old objects intermingle.',
            p3: `Professor.E's "Forgotten Materials" series showcases mottled textures through traditional craftsmanship like natural plant dyeing, iron rust dyeing, and color rubbing. These textures complement the old wallpaper, hand-applied coatings, and faded walls within the space. This mottled effect is not random but a deliberately preserved "trace"—the brand's desired message of imperfect beauty becomes the most compelling visual language in the space.`,
            p4: `As the designer put it: "Rather than a mottled feel, it's more about traces." Professor.E's designs emphasize the layering of materials and cultures. For instance, using Chinese Xiangyunsha fabric from Guangzhou for European-style suits demonstrates the beauty of conflict and fusion. This interwoven vocabulary also imbues the space itself with an irreplaceable character.`,
            p5: 'Stepping into the inner courtyard, the dry landscape garden, jointly crafted by Yilanfanghua Design and the Ura-yama team, features gravel pathways inspired by Karesansui (Japanese rock gardens). Surrounded by scattered plants and swaying tree shadows, it exudes a serene Japanese Zen atmosphere. This tranquil garden is not merely a passageway but a natural realm for lingering, experiencing, and finding peace.',
            p6: 'Display shelves feature Japanese bonsai selected by Ura-yama and caudex plants from 0343 Conservatory, each piece of greenery bearing the marks and forms of natural life. As the brand states: "Plants are living beings; their uncertainty and change perfectly embody the flow of time." These plants become the most vibrant presence in the space, allowing "Ura.219" to exhibit a strong vitality coexisting with a poetic sense of tranquility.'
        },
        smImg: [`${base}news/cafe3_1.jpg`,`${base}news/cafe3_2.jpg`,`${base}news/cafe3_3.jpg`, ,`${base}news/cafe3_4.png`],
        imgCredit: ['Photo by 裏 Ura.219',],
        info: ['裏Ura', '地址：103台北市大同區迪化街一段219號'],
        infoEN:['Ura', 'Address: No. 219, Sec. 1, Dihua St., Datong Dist., Taipei City 103'],
    }
];

function Article() {
    const { language } = useLanguage();
    const { t } = useTranslation();

    localStorage.setItem("currentPath", location.pathname);

    useEffect(() => {
        window.scrollTo(0, 0); // 捲動到頁面頂部
    }, []);

    const navigate = useNavigate();

    function onClickArea(id) {
        navigate(`${base}news/article/${id}`);
    }

    return (
        <>
            <div id='findArticles'>
                <h3 className='title'>{t("news.articles.all")}</h3>
                <NewsNav />

                <main id='article'>

                    {/* Section 1: 文章列表 */}

                    <section className="sec1">
                        {/* 關鍵字搜尋 */}
                        <div className="searchBar">
                            {/* <input type="search" placeholder="請輸入關鍵字" /> */}
                            <SearchBar articles={articles} />
                        </div>
                        {/* 每張卡片 */}
                        {articles.map((article) => (
                            <div
                                className="articleCard"
                                key={article.id}
                                onClick={() => onClickArea(article.id)}
                            >
                                <figure>
                                    <img src={article.image} alt={article.title} />
                                </figure>

                                <div className="articleCardText">
                                    <h2>{ language === 'zh-TW' ? article.title : article.titleEN}</h2>
                                    <p className="articleContent">{ language === 'zh-TW' ? article.content : article.contentEN}</p>

                                </div>
                            </div>
                        ))}

                        {/* 頁碼 */}
                        {/* <div className="pageNumberArea">
                            <div>
                                <p>1</p>
                                <p>2</p>
                                <p>3</p>
                            </div>
                        </div> */}


                    </section>

                    {/* 人氣推薦 */}
                    <section className="sec2">
                        <h2 className='title'>{t("news.articles.hottest")}</h2>
                        {/* 每張卡片 */}
                        {hotArticles.map((article) => (
                            <div className="articleCard"
                                key={article.id}
                                onClick={() => onClickArea(article.id)}
                            >
                                <img src={article.image} alt={article.title} loading="lazy" />
                                <div className="articleCardText">
                                    <h2>{ language === 'zh-TW' ? article.title : article.titleEN }</h2>
                                    <p className="articleContent">{ language === 'zh-TW' ? article.content : article.contentEN}</p>
                                </div>
                            </div>
                        ))}

                    </section>

                </main>

            </div>
        </>

    )
}
export default Article