<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card outlined>
            <v-parallax
              height="200"
              src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
            >
              <v-app-bar flat color="rgba(0, 0, 0, 0)" class="mt-6">
                <v-btn color="white" icon @click.stop="$router.go(-1)">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>

                <v-toolbar-title class="title white--text pl-0">
                  Article
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-menu left bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" color="white">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                      <v-list-item-title>Option {{ n }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-app-bar>
              <v-card-title class="white--text mt-16">
                <p class="ml-3 font-weight-medium text-h4">
                  {{ article.title }}
                </p>
              </v-card-title>
            </v-parallax>
            <v-card-subtitle>
              上次编辑于 {{ moment.utc(article.lastEditTime).fromNow() }} |
              创建于{{ moment.utc(article.createTime).format('lll') }}
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
              <p
                v-for="paragraph in article.paragraph"
                v-bind:key="paragraph"
                class="text-body-1"
              >
                {{ paragraph }}
              </p>
              <p class="text-body-1">
                豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。
              </p>
              <p class="text-body-1">
                时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路，访风景于崇阿；临帝子之长洲，得天人之旧馆。层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即冈峦之体势。
              </p>
              <p class="text-body-1">
                披绣闼，俯雕甍，山原旷其盈视，川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙之舳。云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。
              </p>
              <p class="text-body-1">
                遥襟甫畅，逸兴遄飞。爽籁发而清风生，纤歌凝而白云遏。睢园绿竹，气凌彭泽之樽；邺水朱华，光照临川之笔。四美具，二难并。穷睇眄于中天，极娱游于暇日。天高地迥，觉宇宙之无穷；兴尽悲来，识盈虚之有数。望长安于日下，目吴会于云间。地势极而南溟深，天柱高而北辰远。关山难越，谁悲失路之人？萍水相逢，尽是他乡之客。怀帝阍而不见，奉宣室以何年？
              </p>
              <p class="text-body-1">
                嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子见机，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！
              </p>
              <p class="text-body-1">
                勃，三尺微命，一介书生。无路请缨，等终军之弱冠；有怀投笔，慕宗悫之长风。舍簪笏于百龄，奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨陪鲤对；今兹捧袂，喜托龙门。杨意不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？
              </p>
              <p class="text-body-1">
                呜乎！胜地不常，盛筵难再；兰亭已矣，梓泽丘墟。临别赠言，幸承恩于伟饯；登高作赋，是所望于群公。敢竭鄙怀，恭疏短引；一言均赋，四韵俱成。请洒潘江，各倾陆海云尔：
              </p>
              <p class="text-body-1">
                滕王高阁临江渚，佩玉鸣鸾罢歌舞。
                画栋朝飞南浦云，珠帘暮卷西山雨。<br />
                闲云潭影日悠悠，物换星移几度秋。
                阁中帝子今何在？槛外长江空自流。
              </p>
            </v-card-text>
            <v-card-subtitle>
              <v-chip class="ma-2" color="pink" label text-color="white">
                <v-icon left> mdi-label </v-icon>
                Tags
              </v-chip>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as moment from 'moment'
moment.locale('zh-cn')

export default {
  data() {
    return {
      article: {
        title: null,
        text: null,
        paragraph: []
      },
      readMark: true
    }
  },
  created() {
    this.getArticleInfo()
    // console.info(this.$route)
  },
  mounted() {
    this.$vuetify.goTo(0)
    this.scroll()
  },
  methods: {
    getArticleInfo() {
      this.$axios
        .get('api/articles/aid/' + this.$route.params.aid)
        .then(response => {
          // console.info(response.data.data)
          this.article = response.data.data
          this.article.paragraph = this.article.text.split(/[\s\n]/)
        })
    },
    scroll() {
      window.onscroll = () => {
        // console.info(window.pageYOffset)
        // console.info(window.innerHeight)
        // console.info(document.body.offsetHeight)
        const bottomOfWindow =
          window.pageYOffset + window.innerHeight >=
          document.body.offsetHeight - 100

        if (bottomOfWindow) {
          this.read() // replace it with your code
        }
      }
    },
    read() {
      if (this.readMark) {
        this.readMark = !this.readMark
        this.$axios
          .post('api/articles/aid/' + this.$route.params.aid + '/read')
          .then(response => {
            // console.info(response)
          })
      }
    }
  }
}
</script>

<style></style>
