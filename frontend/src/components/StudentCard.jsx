function StudentCard({ student }) {
  return (
    <div className="student-card">
      <h3>
        {student.name}
        {student.score >= 90 && "🏆"}
      </h3>
      <p>{student.score.toLocaleString()}점</p>
    </div>
  );
}

export default StudentCard;
