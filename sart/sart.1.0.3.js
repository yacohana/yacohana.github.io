// Generated by CoffeeScript 1.8.0
jq$(function() {
  if (jq$('#res_table')[0]) {
    return;
  }
  return jq$.getScript("https://yacohana.github.io/sart/assets/jquery.tablesorter.min.js", function() {
    var count_button, credits, css, data, flag, ga_credits, i, j, lgroup, ratings, res_table, res_tbody, res_tr, row, sgroup, show_button, sort_button, sort_rev_button, sp_credits, str, _i, _j, _k, _len, _len1, _len2, _ref;
    jq$("head").append('<link>');
    css = jq$("head").children(':last');
    css.attr({
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://yacohana.github.io/sart/assets/style.css'
    });
    data = [];
    jq$('tr').each(function(i) {
      data[i] = [];
      return jq$('td', jq$(this)).each(function(j) {
        return data[i][j] = jq$(this).text().trim();
      });
    });
    res_table = jq$('<table id="res_table">');
    res_tr = jq$('<tr>');
    res_tr.append('<th>分野名</th><th>系列名</th><th>科目名</th>');
    _ref = data[1];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      str = _ref[i];
      if (!(i === 0 || i === 4)) {
        res_tr.append("<th>" + str + "</th>");
      }
    }
    res_table.append(jq$('<thead>').append(res_tr));
    res_tbody = jq$('<tbody>');
    flag = false;
    ratings = new Object;
    credits = new Object;
    ga_credits = new Object;
    sp_credits = new Object;
    for (i = _j = 0, _len1 = data.length; _j < _len1; i = ++_j) {
      row = data[i];
      if (i < 2) {
        continue;
      }
      if (row.length < 2) {
        if (flag) {
          lgroup = sgroup;
          sgroup = row[0];
        } else {
          sgroup = row[0];
        }
        flag = true;
      } else {
        flag = false;
        res_tr = jq$('<tr>');
        res_tr.append("<td>" + lgroup + "</td><td>" + sgroup + "</td>");
        for (j = _k = 0, _len2 = row.length; _k < _len2; j = ++_k) {
          str = row[j];
          if (j !== 4) {
            res_tr.append("<td>" + str + "</td>");
          }
        }
        res_tbody.append(res_tr);
        if (ratings[row[5]] == null) {
          ratings[row[5]] = 0;
        }
        if (credits[row[5]] == null) {
          credits[row[5]] = 0;
        }
        ratings[row[5]] += 1;
        if ([row[3]] != null) {
          credits[row[5]] += parseInt(row[3]);
        }
        if (String(lgroup).search("専門") === -1) {
          if (ga_credits[row[5]] == null) {
            ga_credits[row[5]] = 0;
          }
          if ([row[3]] != null) {
            ga_credits[row[5]] += parseInt(row[3]);
          }
        } else {
          if (sp_credits[row[5]] == null) {
            sp_credits[row[5]] = 0;
          }
          if ([row[3]] != null) {
            sp_credits[row[5]] += parseInt(row[3]);
          }
        }
      }
    }
    res_table.append(res_tbody);
    jq$("table.list").before(res_table);
    res_table.tablesorter({
      sortList: [[7, 1], [8, 1]]
    });
    show_button = jq$('<button id="show_button">元の表を表示</button>').click(function() {
      jq$("table.list").toggle();
      return false;
    });
    sort_button = jq$('<button id="sort_button">セメスター順に並べ替え</button>').click(function() {
      var sorting;
      sorting = [[7, 0], [8, 0]];
      res_table.trigger("sorton", [sorting]);
      return false;
    });
    sort_rev_button = jq$('<button id="sort_rev_button">セメスター逆順に並べ替え</button>').click(function() {
      var sorting;
      sorting = [[7, 1], [8, 1]];
      res_table.trigger("sorton", [sorting]);
      return false;
    });
    count_button = jq$('<button id="count_button">評価/単位数カウント・GPA表示</button>').click(function() {
      var count_float, credit, gpa, gpa_den, gpa_frac, rating, sum, val;
      str = "<p><strong>評価数カウント</strong><br>";
      sum = 0;
      for (rating in ratings) {
        val = ratings[rating];
        if ((val != null) && !isNaN(val && val !== 0)) {
          if (rating === "") {
            str += "評価なし : " + val + "<br>";
          } else {
            str += "" + rating + " : " + val + "<br>";
          }
          sum += val;
        }
      }
      str += "合計 : " + sum + "</p><hr><br><p><strong>単位数カウント</strong><br>";
      sum = 0;
      gpa_frac = 0;
      gpa_den = 0;
      for (credit in credits) {
        val = credits[credit];
        if ((val != null) && !isNaN(val && val !== 0)) {
          if (credit === "") {
            str += "評価なし : " + val + "<br>";
          } else {
            str += "" + credit + " : " + val + "<br>";
          }
          if (credit === "ＡＡ") {
            gpa_frac += 4 * val;
            gpa_den += val;
          }
          if (credit === "Ａ") {
            gpa_frac += 3 * val;
            gpa_den += val;
          }
          if (credit === "Ｂ") {
            gpa_frac += 2 * val;
            gpa_den += val;
          }
          if (credit === "Ｃ") {
            gpa_frac += val;
            gpa_den += val;
          }
          if (credit === "Ｄ") {
            gpa_den += val;
          }
          sum += val;
        }
      }
      str += "合計 : " + sum + "</p><hr><br><p><strong>全学科目単位数カウント</strong><br>";
      sum = 0;
      for (credit in ga_credits) {
        val = ga_credits[credit];
        if ((val != null) && !isNaN(val && val !== 0)) {
          if (credit === "") {
            str += "評価なし : " + val + "<br>";
          } else {
            str += "" + credit + " : " + val + "<br>";
          }
          sum += val;
        }
      }
      str += "合計 : " + sum + "</p><hr><br><p><strong>専門科目単位数カウント</strong><br>";
      sum = 0;
      for (credit in sp_credits) {
        val = sp_credits[credit];
        if ((val != null) && !isNaN(val && val !== 0)) {
          if (credit === "") {
            str += "評価なし : " + val + "<br>";
          } else {
            str += "" + credit + " : " + val + "<br>";
          }
          sum += val;
        }
      }
      str += "合計 : " + sum + "</p><hr><br><p><strong>GPA</strong><br>";
      gpa = gpa_frac / gpa_den;
      gpa = gpa.toPrecision(3);
      str += "GPA : " + gpa + "</strong><br></p><hr><br>";
      count_float = jq$("<div id='count_float'>" + str + "<div>");
      openFloatDialog(count_float, 300, "評価/単位数カウント");
      return false;
    });
    jq$("table.list").before(show_button);
    res_table.before(sort_button);
    res_table.before(sort_rev_button);
    res_table.before(count_button);
    return jq$("table.list").hide();
  });
});
