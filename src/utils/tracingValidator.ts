type Point = { x: number; y: number };

const distance = (a: Point, b: Point) => {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
  );
};

export const validateTracing = (
  letterPoints: Point[],
  userPoints: Point[],
  tolerance = 25
) => {
  if (userPoints.length === 0) return 0;

  let matched = 0;

  letterPoints.forEach(lp => {
    const hit = userPoints.some(up => distance(lp, up) <= tolerance);
    if (hit) matched++;
  });

  return Math.round((matched / letterPoints.length) * 100);
};
