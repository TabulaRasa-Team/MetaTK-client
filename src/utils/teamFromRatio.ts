import type { StoreRatio } from '../types/api';

export type TeamName = '고구려' | '백제' | '신라' | '미점령';

export function getTeamFromRatio(ratio: StoreRatio): TeamName {
  const ratioAny = ratio as any;

  // API 키 이름 이슈 처리: _ratio_ratio 또는 _ratio
  const goguryeo_ratio = ratioAny.goguryeo_ratio_ratio ?? ratioAny.goguryeo_ratio ?? 0;
  const baekjae_ratio = ratioAny.baekjae_ratio_ratio ?? ratioAny.baekjae_ratio ?? 0;
  const shinla_ratio = ratioAny.shinla_ratio_ratio ?? ratioAny.shinla_ratio ?? 0;

  // 모든 비율이 0이면 미점령
  if (goguryeo_ratio === 0 && baekjae_ratio === 0 && shinla_ratio === 0) {
    return '미점령';
  }

  // 가장 높은 비율의 팀 반환
  const max = Math.max(goguryeo_ratio, baekjae_ratio, shinla_ratio);

  if (max === goguryeo_ratio) return '고구려';
  if (max === baekjae_ratio) return '백제';
  return '신라';
}
