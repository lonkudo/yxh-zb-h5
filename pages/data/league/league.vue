<template>
  <div>
    <team-head :info="leagueInfo"> </team-head>
  </div>
</template>
<script>
import TeamHead from "../TeamHead";
import {
  getCountryDetail,
  getFifaRankCountry,
  getCountryInfo,
} from "@/api/data";
export default {
  name: "League",
  components: {
    TeamHead,
  },
  data() {
    return {
      leagueInfo: {},
      competition_id: "",
    };
  },
  onLoad(option) {
    this.leagueInfo = JSON.parse(decodeURIComponent(option.item));
    console.log(this.leagueInfo);
    this.competition_id = this.leagueInfo.team_id;
    this.getCountryInfo();
    // this.getTeamLeagueRank();
  },
  methods: {
    getCountryInfo() {
      getCountryInfo(this.competition_id).then((res) => {
        this.leagueInfo = res.info;
        // this.leagueInfo.coach.name = res.info.coach;
        // this.leagueInfo.foundation_time = res.info.foundation_time;
        // this.leagueInfo.country.name = res.info.country;
        // this.leagueInfo.venue.name_en = res.info.venue_name;
        // this.leagueInfo.venue.capacity = res.info.venue_capacity;
        // this.leagueInfo.honor_list = res.info.honor_list;
        console.log(this.leagueInfo);
      });
    },
  },
};
</script>
<style scoped lang="scss"></style>
